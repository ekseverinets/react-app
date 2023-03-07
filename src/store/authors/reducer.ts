import { AuthorActionTypes, AuthorsAction } from './types';
import { IAuthor } from '../../models';

export interface IAuthorsInitialState {
	authors: IAuthor[];
}

const authorsInitialState = {
	authors: [],
};

export const authorsReducer = (
	state: IAuthorsInitialState = authorsInitialState,
	action: AuthorsAction
): IAuthorsInitialState => {
	switch (action.type) {
		case AuthorActionTypes.FETCH_AUTHORS:
			return {
				authors: action.payload,
			};

		case AuthorActionTypes.FETCH_AUTHORS_ERROR:
			return { authors: [] };

		case AuthorActionTypes.ADD_AUTHOR:
			return { authors: [] };

		case AuthorActionTypes.DELETE_AUTHOR: {
			return { authors: [] };
		}
		default:
			return state;
	}
};
