import Immutable from 'immutable'
import { types as postTypes } from './posts'
import { types as commentTypes } from './comments'
import { types as authTypes } from './auth' 

const initialState = Immutable.fromJS({})

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case postTypes.FETCH_ALL_POST:
		case commentTypes.FETCH_COMMENTS:
			return state.merge(action.users)
		case postTypes.FETCH_POST:
			return state.set(action.user.id, action.user)
		case authTypes.LOGIN:
			const id = action.userId, username = action.username;
			const user = { id, username }
			return state.set(id, user)
		default:
			return state
	}
}

export default reducer

export const getUsers = state => state.get("users") 

export const getUserById = (state, id) => state.getIn(['users', id])