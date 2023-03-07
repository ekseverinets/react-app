import { IUser, UserAction, UserActionTypes } from './types';

export interface IUserInitialState {
	result: IUser | string;
	successful: boolean;
	registerError: boolean;
}

const userInitialState = {
	result: '',
	successful: false,
	registerError: false,
};

export const userReducer = (
	state: IUserInitialState = userInitialState,
	action: UserAction
): IUserInitialState => {
	switch (action.type) {
		case UserActionTypes.FETCH_USER:
			return {
				result: action.payload.result,
				successful: action.payload.successful,
				registerError: false,
			};
		case UserActionTypes.FETCH_USER_ERROR:
			return {
				result: '',
				successful: false,
				registerError: false,
			};
		case UserActionTypes.REGISTER_USER:
			return {
				result: action.payload.result,
				successful: action.payload.successful,
				registerError: false,
			};
		case UserActionTypes.REGISTER_USER_ERROR:
			return {
				result: '',
				successful: false,
				registerError: true,
			};
		case UserActionTypes.LOGOUT_USER:
			return {
				result: '',
				successful: true,
				registerError: false,
			};
		case UserActionTypes.LOGOUT_USER_ERROR:
			return {
				result: '',
				successful: false,
				registerError: false,
			};
		default:
			return state;
	}
};
