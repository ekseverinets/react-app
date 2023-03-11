import { IUser, UserAction, UserActionTypes } from './types';

export interface IUserInitialState {
	result: IUser | string;
	error: null | string;
}

const userInitialState = {
	result: '',
	error: null,
};

export const userReducer = (
	state: IUserInitialState = userInitialState,
	action: UserAction
): IUserInitialState => {
	switch (action.type) {
		case UserActionTypes.FETCH_USER:
			return {
				result: action.payload.result,
				error: null,
			};
		case UserActionTypes.FETCH_USER_ERROR:
			return {
				result: '',
				error: action.payload,
			};
		case UserActionTypes.REGISTER_USER:
			return {
				result: action.payload.result,
				error: null,
			};
		case UserActionTypes.REGISTER_USER_ERROR:
			return {
				result: '',
				error: action.payload,
			};
		case UserActionTypes.LOGOUT_USER:
			return {
				result: '',
				error: null,
			};
		case UserActionTypes.LOGOUT_USER_ERROR:
			return {
				result: '',
				error: action.payload,
			};
		default:
			return state;
	}
};
