import { IUser, UserAction, UserActionTypes } from './types';

export interface IUserInitialState {
	result: {
		result: IUser | string;
		successful: boolean;
	};
}

const userInitialState = {
	result: {
		result: '',
		successful: false,
	},
};

export const userReducer = (
	state: IUserInitialState = userInitialState,
	action: UserAction
): IUserInitialState => {
	switch (action.type) {
		case UserActionTypes.FETCH_USER:
			return {
				result: action.payload,
			};
		case UserActionTypes.FETCH_USER_ERROR:
			return {
				result: { successful: false, result: '' },
			};
		case UserActionTypes.REGISTER_USER:
			return {
				result: action.payload,
			};
		case UserActionTypes.REGISTER_USER_ERROR:
			return {
				result: { successful: false, result: '' },
			};
		case UserActionTypes.LOGOUT_USER:
			return {
				result: { successful: false, result: '' },
			};
		default:
			return state;
	}
};
