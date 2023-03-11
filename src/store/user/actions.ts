import { UserActionTypes } from './types';
import { apiClient, getAxiosErrorMessage } from '../../services';
import { AppDispatch } from '../index';
import { IUser } from '../../models';
import { IUrls } from '../../constants/api';
import { getToken, setToken } from '../../constants/constants';

export const fetchUser =
	(authToken: string) => async (dispatch: AppDispatch) => {
		try {
			const response = await apiClient.get(IUrls.get_user_URL, {
				headers: { Authorization: authToken },
			});

			dispatch({
				type: UserActionTypes.FETCH_USER,
				payload: response.data,
			});
		} catch (error) {
			const errorMessage = getAxiosErrorMessage(error);

			dispatch({
				type: UserActionTypes.FETCH_USER_ERROR,
				payload: errorMessage || '',
			});
		}
	};

export const registerUser =
	(userToRegister: IUser, callBack?: () => void) =>
	async (dispatch: AppDispatch) => {
		try {
			const response = await apiClient.post(IUrls.register_URL, userToRegister);

			dispatch({
				type: UserActionTypes.REGISTER_USER,
				payload: response.data.result,
			});

			if (callBack) {
				callBack();
			}
		} catch (error) {
			const errorMessage = getAxiosErrorMessage(error);

			dispatch({
				type: UserActionTypes.REGISTER_USER_ERROR,
				payload: errorMessage || '',
			});
		}
	};

export const loginUser =
	(userToLogin: IUser, callBack?: () => void) =>
	async (dispatch: AppDispatch) => {
		try {
			const response = await apiClient.post(IUrls.login_URL, userToLogin);
			setToken(response.data.result);

			const userResponse = await apiClient.get(IUrls.get_user_URL, {
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
			const errorMessage = getAxiosErrorMessage(error);

			dispatch({
				type: UserActionTypes.FETCH_USER_ERROR,
				payload: errorMessage || '',
			});
		}
	};

export const logoutUser = () => async (dispatch: AppDispatch) => {
	try {
		dispatch({ type: UserActionTypes.LOGOUT_USER });
		await apiClient.delete(IUrls.logout_URL, {
			headers: { Authorization: getToken() },
		});
	} catch (error) {
		const errorMessage = getAxiosErrorMessage(error);

		dispatch({
			type: UserActionTypes.LOGOUT_USER_ERROR,
			payload: errorMessage || '',
		});
	}
};
