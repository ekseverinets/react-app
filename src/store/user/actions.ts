import { UserActionTypes } from './types';
import apiClient from '../../services';

export const fetchUser = (authToken) => {
	return async (dispatch) => {
		try {
			const response = await apiClient.get('/users/me', {
				headers: { Authorization: authToken },
			});
			console.log(response.data);

			dispatch({
				type: UserActionTypes.FETCH_USER_SUCCESS,
				payload: response.data,
			});
		} catch (error) {
			dispatch({ type: UserActionTypes.FETCH_USER_ERROR, payload: `${error}` });
		}
	};
};

export const registerUser = (userToRegister) => {
	return async (dispatch) => {
		try {
			const response = await apiClient.post(`/register`, userToRegister);
			console.log(response.data);

			dispatch({
				type: UserActionTypes.REGISTER_USER_SUCCESS,
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

export const loginUser = (userToLogin) => {
	return async (dispatch) => {
		try {
			const response = await apiClient.post(`/login`, userToLogin);
			console.log(response.data);

			localStorage.setItem('user-info', response.data.result);
			const secondResponse = await apiClient.get('/users/me', {
				headers: { Authorization: response.data.result },
			});
			console.log(secondResponse.data);

			dispatch({
				type: UserActionTypes.FETCH_USER_SUCCESS,
				payload: secondResponse.data,
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
	return async (dispatch) => {
		try {
			const currentUser = localStorage.getItem('user-info');
			dispatch({ type: UserActionTypes.LOGOUT_USER });
			await apiClient.delete('/logout', {
				headers: { Authorization: `${currentUser}` },
			});
		} catch (error) {
			console.log(`${error}`);
		}
	};
};
