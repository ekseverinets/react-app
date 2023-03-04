import { UserAction, UserActionTypes } from './types';

const userInitialState = {
	result: {
		result: '',
		successful: false,
	},
	error: null,
};

export const userReducer = (state = userInitialState, action: UserAction) => {
	switch (action.type) {
		case UserActionTypes.FETCH_USER:
			return {
				error: null,
				result: action.payload,
			};
		case UserActionTypes.FETCH_USER_ERROR:
			return {
				error: action.payload,
				result: { successful: false, result: '' },
			};
		case UserActionTypes.REGISTER_USER:
			return {
				error: null,
				result: action.payload,
			};
		case UserActionTypes.REGISTER_USER_ERROR:
			return {
				error: action.payload,
				result: { successful: false, result: '' },
			};
		case UserActionTypes.LOGOUT_USER:
			return {
				error: null,
				result: { successful: false, result: '' },
			};
		default:
			return state;
	}
};
