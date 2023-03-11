export enum UserActionTypes {
	FETCH_USER = 'FETCH_USER',
	FETCH_USER_ERROR = 'FETCH_USER_ERROR',
	REGISTER_USER = 'REGISTER_USER',
	REGISTER_USER_ERROR = 'REGISTER_USER_ERROR',
	LOGOUT_USER = 'LOGOUT_USER',
	LOGOUT_USER_ERROR = 'LOGOUT_USER_ERROR',
}

export interface IUser {
	name: string | null;
	email: string;
	password: string;
	role: string;
	id: string;
}

interface IFetchUser {
	type: UserActionTypes.FETCH_USER;
	payload: {
		result: IUser;
	};
}

interface IFetchUserError {
	type: UserActionTypes.FETCH_USER_ERROR;
	payload: string;
}

interface IRegisterUser {
	type: UserActionTypes.REGISTER_USER;
	payload: {
		result: string;
	};
}

interface IRegisterUserError {
	type: UserActionTypes.REGISTER_USER_ERROR;
	payload: string;
}

interface ILogoutUser {
	type: UserActionTypes.LOGOUT_USER;
	payload: string;
}

interface ILogoutUserError {
	type: UserActionTypes.LOGOUT_USER_ERROR;
	payload: string;
}

export type UserAction =
	| IFetchUser
	| IFetchUserError
	| IRegisterUser
	| IRegisterUserError
	| ILogoutUser
	| ILogoutUserError;
