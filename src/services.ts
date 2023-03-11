import axios, { AxiosError } from 'axios';
import { IUrls } from './constants/api';

interface ErrorData {
	message: string;
	errors: ''[];
	result: '';
}

export const getAxiosErrorMessage = (error: AxiosError<ErrorData>) => {
	if (error.response) {
		const { message, errors, result } = error.response.data;
		console.log(error.response);

		return message || result || errors[0];
	} else if (error.request) {
		return error.request;
	} else {
		return error.message;
	}
};

export const apiClient = axios.create({
	baseURL: IUrls.base_URL,
});
