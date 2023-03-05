import { UserAction, UserActionTypes } from './types';
import apiClient from '../../services';
import { AppDispatch, RootState } from '../index';
import { ThunkAction } from 'redux-thunk';
import { IUser } from '../../models';

export const fetchUser = (authToken: string) => {
	return async (dispatch: AppDispatch) => {
		try {
			const response = await apiClient.get('/users/me', {
				headers: { Authorization: authToken },
			});
			console.log(response.data);

			dispatch({
				type: UserActionTypes.FETCH_USER,
				payload: response.data,
			});
		} catch (error) {
			dispatch({ type: UserActionTypes.FETCH_USER_ERROR, payload: `${error}` });
		}
	};
};

export const registerUser = (
	userToRegister: IUser
): ThunkAction<Promise<boolean>, RootState, undefined, UserAction> => {
	return async (dispatch: AppDispatch) => {
		try {
			const response = await apiClient.post(`/register`, userToRegister);
			console.log(response.data);

			dispatch({
				type: UserActionTypes.REGISTER_USER,
				payload: response.data.result,
			});
			return true;
		} catch (error) {
			dispatch({
				type: UserActionTypes.REGISTER_USER_ERROR,
				payload: `${error}`,
			});
			return false;
		}
	};
};

export const loginUser = (
	userToLogin: IUser
): ThunkAction<Promise<boolean>, RootState, undefined, UserAction> => {
	return async (dispatch: AppDispatch) => {
		try {
			const response = await apiClient.post(`/login`, userToLogin);
			localStorage.setItem('token', response.data.result);

			const userResponse = await apiClient.get('/users/me', {
				headers: { Authorization: response.data.result },
			});

			dispatch({
				type: UserActionTypes.FETCH_USER,
				payload: userResponse.data,
			});
			return true;
		} catch (error) {
			dispatch({
				type: UserActionTypes.FETCH_USER_ERROR,
				payload: `${error}`,
			});
			return false;
		}
	};
};

export const logoutUser = () => {
	return async (dispatch: AppDispatch) => {
		try {
			const token = localStorage.getItem('token');
			dispatch({ type: UserActionTypes.LOGOUT_USER });
			await apiClient.delete('/logout', {
				headers: { Authorization: `${token}` },
			});
		} catch (error) {
			console.log(`${error}`);
		}
	};
};
