import Immutable from 'immutable'
import { types as postTypes } from './posts'

const initialState = Immutable.fromJS({
	addDialogOpen: false,
	createDialogOpen: false 
})

export const types = {
	OPEN_ADD_DIALOG: "UI/OPEN_ADD_DIALOG",
	CLOSE_ADD_DIALOG: "UI/CLOSE_ADD_DIALOG",
	OPEN_EDIT_DIALOG: "UI/OPEN_EDIT_DIALOG",
	CLOSE_EDIT_DIALOG: "UI/CLOSE_EDIT_DIALOG"
}

export const actions = {
	openAddDialog: () => ({
		type: types.OPEN_ADD_DIALOG
	}),
	closeAddDialog: () => ({
		type: types.CLOSE_ADD_DIALOG
	}),
	openEditDialog: () => ({
		type: types.OPEN_EDIT_DIALOG
	}),
	closeEditDialog: () => ({
		type: types.CLOSE_EDIT_DIALOG
	})
}

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case types.OPEN_ADD_DIALOG:
			return state.set('addDialogOpen', true)
		case types.CLOSE_ADD_DIALOG:
			return state.set('addDialogOpen', false)
		case types.OPEN_EDIT_DIALOG:
			return state.set('editDialogOpen', true)
		case types.CLOSE_EDIT_DIALOG:
		case postTypes.UPDATE_POST:
			return state.set('editDialogOpen', false)
		default:
			return state 
	}
}

export default reducer

export const isAddDialogOpen = state => state.getIn(['ui', 'addDialogOpen'])

export const isEditDialogOpen = state => state.getIn(['ui', 'editDialogOpen'])