import { combineReducers } from 'redux-immutable'
import Immutable from "immutable"
import app from './app'
import auth from './auth'
import ui from './ui'
import posts, { getPostIds, getPostById } from './posts'
import comments, { getCommentById, getCommentIdsByPost } from './comments'
import users, { getUserById } from './users'

const rootReducer = combineReducers({
	app,
	auth,
	ui,
	posts,
	comments,
	users
})

export default rootReducer 

export const getPostListWithAuthors = state => {
	const postIds = getPostIds(state)
	return postIds.map( id => {
		const post = getPostById(state, id)
		console.log(post)
		return post.merge({ author: getUserById(state, post.get('author')) })
	})
}

export const getPostDetail = (state, id) => {
	const post = getPostById(state, id)
	return post ? post.merge({ author: getUserById(state, post.get('author')) }) : null 
}

export const getCommentsWithAuthors = (state, postId) => {
	const commentIds = getCommentIdsByPost(state, postId)
	if (commentIds) {
		return commentIds.map( id => {
			let comment = getCommentById(state, id)
			return comment.merge({ author: getUserById(state, comment.get('author')) })
		})
	} else {
		return Immutable.List()
	}
}