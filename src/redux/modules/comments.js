import { combineReducers } from 'redux'
import { actions as appActions } from './app'
import { get, post } from '../../utils/request'
import url from '../../utils/url'

// initialstate
const initialState = {
	byPost: {},
	byId: {}
}

// action types
export const types = {
	FETCH_COMMENTS: "COMMENTS/FETCH_COMMENTS",
	CREATE_COMMENT: "COMMENTS/CREATE_COMMENT"
}

// thunk actions
export const actions = {
	fetchComments: postId => {
		return (dispatch, getState) => {
      if (shouldFetchComments(getState(), postId)) {
        dispatch(appActions.startRequest());
        return get(url.getCommentList(postId)).then(data => {
          dispatch(appActions.finishRequest());
          if (!data.error) {
            const { commentIds, comments, users } = convertCommentsToPlain(
              data
            );
            dispatch(fetchCommentsSuccess(commentIds, comments, users, postId));
          } else {
            dispatch(appActions.setError(data.error));
          }
        });
      }
    };
	},

	createComment: comment => {
		return dispatch => {
			dispatch(appActions.startRequest())
			return post(url.createComment(), comment).then(data => {
				dispatch(appActions.finishRequest())
				if (!data.error) {
					dispatch(createCommentSuccess(data.post, data))
				} else {
					dispatch(appActions.setError(data.error))
				}
			})
		}
	}
}

// thunk action success
const fetchCommentsSuccess = (commentIds, comments, users, postId) => ({
  type: types.FETCH_COMMENTS,
  comments,
  commentIds,
  users,
  postId
});

const createCommentSuccess = (postId, comment) => ({
	type: types.CREATE_COMMENT,
	postId,
	comment 
})

// should ?
const shouldFetchComments = (state, postId) => {
	return !state.comments.byPost[postId]
}

// convert RawData To Plain
const convertCommentsToPlain = comments => {
	const plainComments = {}
	const commentIds = []
	const authorsById = {}
	comments.forEach(item => {
		plainComments[item.id] = { ...item, author: item.author.id }
		commentIds.push(item.id)
		if (!authorsById[item.id]) {
			authorsById[item.id] = item.author 
		}
	})
	return {
		comments: plainComments,
		commentIds: commentIds,
		users: authorsById
	}
}

// reducers
const byPost = (state = initialState.byPost, action) => {
	switch(action.type) {
		case types.FETCH_COMMENTS:
			return { ...state, [action.postId]: action.commentIds }
		case types.CREATE_COMMENT:
			return { 
				...state,
				[action.postId]: [...state[action.postId], action.comment.id]
			}
		default:
			return state 
	}
}

const byId = (state = initialState.byId, action) => {
	switch(action.type) {
		case types.FETCH_COMMENTS:
			return { ...state, ...action.comments }
		case types.CREATE_COMMENT:
			return { ...state, [action.comment.id]: action.comment }
		default:
			return state 
	}
}

const reducer = combineReducers({
	byPost,
	byId 
})

export default reducer

// specific methods
export const getCommentIdsByPost = (state, postId) => state.comments.byPost[postId]

export const getComments = state => state.comment.byId 

export const getCommentById = (state, id) => state.comments.byId[id]