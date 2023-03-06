import { AuthorActionTypes } from './types';
import apiClient from '../../services';
import { AppDispatch } from '../index';
import { IAuthor } from '../../models';

export const fetchAuthors = () => async (dispatch: AppDispatch) => {
	try {
		const response = await apiClient.get('/authors/all');

		dispatch({
			type: AuthorActionTypes.FETCH_AUTHORS,
			payload: response.data.result,
		});
	} catch (error) {
		dispatch({
			type: AuthorActionTypes.FETCH_AUTHORS_ERROR,
			payload: `${error}`,
		});
	}
};

export const addAuthor =
	(newAuthor: IAuthor) => async (dispatch: AppDispatch) => {
		try {
			const token = localStorage.getItem('token');

			const response = await apiClient.post('/authors/add', newAuthor, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `${token}`,
				},
			});

			dispatch({
				type: AuthorActionTypes.ADD_AUTHOR,
				payload: response.data.result,
			});

			const authorsResponse = await apiClient.get('authors/all');

			dispatch({
				type: AuthorActionTypes.FETCH_AUTHORS,
				payload: authorsResponse.data.result,
			});
		} catch (error) {
			const [errorMessage] = error.response.data.errors;

			dispatch({
				type: AuthorActionTypes.FETCH_AUTHORS_ERROR,
				payload: `${errorMessage}`,
			});
		}
	};

export const deleteAuthor = (id: string) => async (dispatch: AppDispatch) => {
	try {
		const token = localStorage.getItem('token');

		const response = await apiClient.delete(`/authors/${id}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${token}`,
			},
		});

		dispatch({
			type: AuthorActionTypes.DELETE_AUTHOR,
			payload: response.data.result,
		});

		const authorsResponse = await apiClient.get('authors/all');

		dispatch({
			type: AuthorActionTypes.FETCH_AUTHORS,
			payload: authorsResponse.data.result,
		});
	} catch (error) {
		const [errorMessage] = error.response.data.errors;

		dispatch({
			type: AuthorActionTypes.FETCH_AUTHORS_ERROR,
			payload: `${errorMessage}`,
		});
	}
};
