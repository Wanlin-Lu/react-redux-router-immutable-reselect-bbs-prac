import { types as postTypes } from './posts'
import { types as commentTypes } from './comments'
import { types as authTypes } from './auth' 

const initialState = {}

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case postTypes.FETCH_ALL_POST:
		case commentTypes.FETCH_COMMENTS:
			return { ...state, ...action.users }
		case postTypes.FETCH_POST:
			return { ...state, [action.user.id]: action.user }
		case authTypes.LOGIN:
			const id = action.userId, username = action.username;
			return { ...state, [action.userId]:{id,username}}
		default:
			return state
	}
}

export default reducer

export const getUsers = state => state.users 

export const getUserById = (state, Id) => state.users[Id]