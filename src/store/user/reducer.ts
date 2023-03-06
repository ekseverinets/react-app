import { IUser, UserAction, UserActionTypes } from './types';

export interface IUserInitialState {
	result: IUser | string;
	successful: boolean;
}

const userInitialState = {
	result: '',
	successful: false,
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
			};
		case UserActionTypes.FETCH_USER_ERROR:
			return {
				result: '',
				successful: false,
			};
		case UserActionTypes.REGISTER_USER:
			return {
				result: action.payload.result,
				successful: action.payload.successful,
			};
		case UserActionTypes.REGISTER_USER_ERROR:
			return {
				result: '',
				successful: false,
			};
		case UserActionTypes.LOGOUT_USER:
			return {
				result: '',
				successful: true,
			};
		case UserActionTypes.LOGOUT_USER_ERROR:
			return {
				result: '',
				successful: false,
			};
		default:
			return state;
	}
};
