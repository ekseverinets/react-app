import { UserActionTypes } from './types';
import apiClient from '../../services';
import { AppDispatch } from '../index';

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

export const registerUser = (userToRegister: {
	name: string;
	email: string;
	password: string;
}) => {
	return async (dispatch: AppDispatch) => {
		try {
			const response = await apiClient.post(`/register`, userToRegister);
			console.log(response.data);

			dispatch({
				type: UserActionTypes.REGISTER_USER,
				payload: response.data.result,
			});
		} catch (error) {
			dispatch({
				type: UserActionTypes.REGISTER_USER_ERROR,
				payload: `${error}`,
			});
		}
	};
};

export const loginUser = (userToLogin: { email: string; password: string }) => {
	return async (dispatch: AppDispatch) => {
		try {
			const response = await apiClient.post(`/login`, userToLogin);
			localStorage.setItem('token', response.data.result);

			const userResponse = await apiClient.get('/users/me', {
				headers: { Authorization: response.data.result },
			});

			const name =
				userResponse.data.result.name === null
					? 'admin'
					: userResponse.data.result.name;

			console.log(userResponse.data);

			const updatedPayload = {
				...userResponse.data,
				result: {
					...userResponse.data.result,
					name: name,
				},
			};

			dispatch({
				type: UserActionTypes.FETCH_USER,
				payload: updatedPayload,
			});
		} catch (error) {
			dispatch({
				type: UserActionTypes.FETCH_USER_ERROR,
				payload: `${error}`,
			});
		}
	};
};

export const logoutUser = () => {
	return async (dispatch: AppDispatch) => {
		try {
			const currentUser = localStorage.getItem('token');
			dispatch({ type: UserActionTypes.LOGOUT_USER });
			await apiClient.delete('/logout', {
				headers: { Authorization: `${currentUser}` },
			});
		} catch (error) {
			console.log(`${error}`);
		}
	};
};
