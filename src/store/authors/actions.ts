import { AuthorActionTypes } from './types';
import { apiClient } from '../../services';
import { AppDispatch } from '../index';
import { IAuthor } from '../../models';
import { IUrls } from '../../constants/api';
import { getToken } from '../../constants/constants';

export const fetchAuthors = () => async (dispatch: AppDispatch) => {
	try {
		const response = await apiClient.get(IUrls.get_authors_URL);

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
			const response = await apiClient.post(IUrls.add_author_URL, newAuthor, {
				headers: {
					Authorization: getToken(),
				},
			});

			dispatch({
				type: AuthorActionTypes.ADD_AUTHOR,
				payload: response.data.result,
			});

			const authorsResponse = await apiClient.get(IUrls.get_authors_URL);

			dispatch({
				type: AuthorActionTypes.FETCH_AUTHORS,
				payload: authorsResponse.data.result,
			});
		} catch (error) {
			dispatch({
				type: AuthorActionTypes.FETCH_AUTHORS_ERROR,
				payload: `${error}`,
			});
		}
	};

export const deleteAuthor = (id: string) => async (dispatch: AppDispatch) => {
	try {
		const response = await apiClient.delete(`/authors/${id}`, {
			headers: {
				Authorization: getToken(),
			},
		});

		dispatch({
			type: AuthorActionTypes.DELETE_AUTHOR,
			payload: response.data.result,
		});

		const authorsResponse = await apiClient.get(IUrls.get_authors_URL);

		dispatch({
			type: AuthorActionTypes.FETCH_AUTHORS,
			payload: authorsResponse.data.result,
		});
	} catch (error) {
		dispatch({
			type: AuthorActionTypes.FETCH_AUTHORS_ERROR,
			payload: `${error}`,
		});
	}
};
