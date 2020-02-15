import { post } from '../../utils/request'
import url from '../../utils/url'
import { actions as appActions } from './app'

const initialState = {
	username: null,
	userId: null 
}

export const types = {
	LOGIN: "AUTH/LOGIN",
	LOGOUT: "AUTH/LOGOUT"
}

export const actions = {
	setLoginInfo: (userId, username) => ({
		type: types.LOGIN,
		userId: userId,
		username: username
	}),
	login: (username, password) => {
		return dispatch => {
			dispatch(appActions.startRequest())
			const params = { username, userId }
			return fetch(url.login(), params).then( data => {
				dispatch(appActions.finishRequest())
				if (!data.error) {
					dispatch(actions.setLoginInfo(data.userId, username));
				} else {
					dispatch(appActions.setError(data.error));
				}
			})
		}
	},
	logout: () => ({
		type: types.LOGOUT 
	})
}

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case types.ADD_USER:
			return { ...state, username: action.username, userId: action.userId }
		case types.REMOVE_USER:
			return { ...state, username: null, userId: null }
		default:
			return state
	}
}

export default reducer 

export const getLoggedUser = state => state.auth