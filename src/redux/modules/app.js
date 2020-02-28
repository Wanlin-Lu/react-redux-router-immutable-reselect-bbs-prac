const initialState = {
	requestQuantity: 0,
	error: null
}

export const types = {
	START_REQUEST: "APP/START_REQUEST",
	FINISH_REQUEST: "APP/FINISH_REQUEST",
	SET_ERROR: "APP/SET_ERROR",
	REMOVE_ERROR: "APP/REMOVE_ERROR"
}

export const actions = {
	startRequest: () => ({
		type: types.START_REQUEST
	}),
	finishRequest: () => ({
		type: types.FINISH_REQUEST
	}),
	setError: error => ({
		type: types.SET_ERROR,
		error 
	}),
	removeError: () => ({
		type: types.REMOVE_ERROR
	})
}

const reducers = (state = initialState, action) => {
	switch(action.type) {
		case types.START_REQUEST:
			return { ...state, requestQuantity: state.requestQuantity + 1 }
		case types.FINISH_REQUEST:
			return { ...state, requestQuantity: state.requestQuantity - 1 }
		case types.SET_ERROR:
			return { ...state, error: action.error }
		case types.REMOVE_ERROR:
			return { ...state, error: null }
		default:
			return state 
	}
}

export default reducers 

export const getRequestQuantity = state => {
	return state.app.requestQuantity
}

export const getError = state => {
	return state.app.error 
}