import { UserActionTypes } from './types';

const initialState = {
	result: {
		successful: false,
		result: '',
	},
	loading: false,
	error: null,
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case UserActionTypes.FETCH_USER_SUCCESS:
			return {
				loading: false,
				result: action.payload,
			};
		case UserActionTypes.FETCH_USER_ERROR:
			return {
				loading: false,
				error: action.payload,
				result: { successful: false, result: '' },
			};
		case UserActionTypes.REGISTER_USER_SUCCESS:
			return {
				loading: false,
				result: action.payload,
			};
		case UserActionTypes.REGISTER_USER_ERROR:
			return {
				loading: false,
				error: action.payload,
				result: { successful: false, result: '' },
			};
		case UserActionTypes.LOGOUT_USER:
			return {
				loading: false,
				result: { successful: false, result: '' },
			};
		default:
			return state;
	}
};
