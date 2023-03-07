import { UserActionTypes } from './types';
import apiClient from '../../services';
import { AppDispatch } from '../index';
import { IUser } from '../../models';

export const fetchUser =
	(authToken: string) => async (dispatch: AppDispatch) => {
		try {
			const response = await apiClient.get('/users/me', {
				headers: { Authorization: authToken },
			});

			dispatch({
				type: UserActionTypes.FETCH_USER,
				payload: response.data,
			});
		} catch (error) {
			dispatch({ type: UserActionTypes.FETCH_USER_ERROR, payload: `${error}` });
		}
	};

export const registerUser =
	(userToRegister: IUser, callBack?: () => void) =>
	async (dispatch: AppDispatch) => {
		try {
			const response = await apiClient.post(`/register`, userToRegister);

			dispatch({
				type: UserActionTypes.REGISTER_USER,
				payload: response.data.result,
			});

			if (callBack) {
				callBack();
			}
		} catch (error) {
			dispatch({
				type: UserActionTypes.REGISTER_USER_ERROR,
				payload: `${error}`,
			});
		}
	};

export const loginUser =
	(userToLogin: IUser, callBack?: () => void) =>
	async (dispatch: AppDispatch) => {
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

			if (callBack) {
				callBack();
			}
		} catch (error) {
			dispatch({
				type: UserActionTypes.FETCH_USER_ERROR,
				payload: `${error}`,
			});
		}
	};

export const logoutUser = () => async (dispatch: AppDispatch) => {
	try {
		const token = localStorage.getItem('token');
		dispatch({ type: UserActionTypes.LOGOUT_USER });
		await apiClient.delete('/logout', {
			headers: { Authorization: `${token}` },
		});
	} catch (error) {
		dispatch({
			type: UserActionTypes.LOGOUT_USER_ERROR,
			payload: `${error}`,
		});
	}
};
