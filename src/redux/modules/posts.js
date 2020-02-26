import  { combineReducers } from 'redux'
import { get, post, put } from '../../utils/request'
import url from '../../utils/url'
import { actions as appActions } from './app'

// initialState
const initialState = {
	byId: {},
	allIds: []
}

// action types
export const types = {
	FETCH_ALL_POST: "POST/FETCH_ALL_POST",
	FETCH_POST: "POST/FETCH_POST",
	CREATE_POST: "POST/CREATE_POST",
	UPDATE_POST: "POST/UPDATE_POST"
}

// start thunk actions
export const actions = {
	fetchAllPosts: () => {
		return (dispatch, getState) => {
			if (shouldFetchAllPosts(getState())) {
				dispatch(appActions.startRequest())
				return get(url.getPostList()).then( data => {
					dispatch(appActions.finishRequest())
					if (!data.error) {
						const { posts, postIds, authors } = convertPostsToPlain(data)
						dispatch(fetchAllPostsSuccess(posts, postIds, authors))
					} else {
						dispatch(appActions.setError(data.error))
					}
				})
			}
		}
	},

	fetchPost: postId => {
		return (getState, dispatch) => {
			if (shouldFetchPost(getState(), postId)) {
				dispatch(appActions.startRequest())
				return get(url.getPostById(postId)).then( data => {
					dispatch(appActions.finishRequest())
					if (!data.error && data.length === 1) {
						console.log(data)
						const { post, author } = convertPostToPlain(data[0])
						dispatch(fetchPostByIdSuccess(post, author))
					} else {
						dispatch(appActions.setError(data.error))
					}
				})
			}
		}
	},

	createPost: (title,content) => {
		return (dispatch, getState) => {
			const state = getState()
			const author = state.auth.userId
			const params = {
				author,
				title,
				content,
				vote: 0
			}
			dispatch(appActions.startRequest())
			return post(url.createPost(), params).then( data => {
				dispatch(appActions.finishRequest())
				if (!data.error) {
					dispatch(createPostSuccess(data))
				} else {
					dispatch(appActions.setError(data.error))
				}
			})
		}
	},

	updatePost: (id, post) => {
		return dispatch => {
			dispatch(appActions.startRequest())
			return put(url.updatePost(id), post).then( data => {
				dispatch(appActions.finishRequest())
				if (!data.error) {
					dispatch(updatePostSuccess(data))
				} else {
					dispatch(appActions.setError(data.error))
				}
			})
		}
	}
}

// actionSuccess
const fetchAllPostsSuccess = (posts, postIds, authors) => ({
	type: types.FETCH_ALL_POST,
	posts,
	postIds,
	users: authors 
})

const fetchPostByIdSuccess = (post, author) => ({
	type: types.FETCH_POST,
	post,
	user: author  
})

const createPostSuccess = post => ({
	type: types.CREATE_POST,
	post: post
})

const updatePostSuccess = post => ({
	type: types.UPDATE_POST,
	post: post 
})

// shouldRequest?
const shouldFetchAllPosts = state => {
	return !state.posts.allIds || state.posts.allIds.length === 0
}

const shouldFetchPost = (state, postId) => {
	return !state.posts.byId[postId] || !state.posts.byId[postId].content
}

// convertToPlain
const convertPostsToPlain = posts => {
	let postsById = {}
	let postIds = []
	let authorsById = {}
	posts.forEach(item => {
		item = item.author ? item : { ...item, author:{id: 123, username: 'none'}}
		postsById[item.id] = { ...item, author: item.author.id }
		postIds.push(item.id)
		if (!authorsById[item.author.id]) {
			authorsById[item.author.id] = item.author
		}
	})
	return {
		posts: postsById,
		postIds: postIds,
		authors: authorsById
	}
}

const convertPostToPlain = post => {
	const plainPost = { ...post, author: post.author.id }
	const author = { ...post.author }
	return {
		post: plainPost,
		author
	}
}

// reducers
const allIds = (state = initialState.allIds, action) => {
	switch(action.type) {
		case types.FETCH_ALL_POST:
			return action.postIds 
		case types.CREATE_POST:
			return [ action.post.id, ...state ]
		default:
			return state 
	}
}

const byId = (state = initialState.byId, action) => {
	switch(action.type) {
		case types.FETCH_ALL_POST:
			return action.posts
		case types.FETCH_POST:
		case types.CREATE_POST:
		case types.UPDATE_POST:
			return {
				...state,
				[action.post.id]:action.post
			}
		default:
			return state
	}
}

const reducer = combineReducers({
	allIds,
	byId
})

export default reducer 

// getSpecificStateMethods
export const getPostList = state => state.posts.byId 
export const getPostIds = state => state.posts.allIds
export const getPostById = (state, id) => state.posts.byId[id]