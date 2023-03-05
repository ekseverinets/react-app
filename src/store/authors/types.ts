import { IAuthor } from '../../models';

export enum AuthorActionTypes {
	FETCH_AUTHORS = 'FETCH_AUTHORS',
	FETCH_AUTHORS_ERROR = 'FETCH_AUTHORS_ERROR',
	// ADD_AUTHOR = 'ADD_AUTHOR',
	// DELETE_AUTHOR = 'DELETE_AUTHOR',
}

interface IFetchAuthors {
	type: AuthorActionTypes.FETCH_AUTHORS;
	payload: IAuthor[];
}

interface IFetchAuthorsError {
	type: AuthorActionTypes.FETCH_AUTHORS_ERROR;
	payload: string;
}

// interface IAddAuthor {
// 	type: AuthorActionTypes.ADD_AUTHOR;
// 	payload: IAuthor;
// }

// interface IDeleteAuthor {
// 	type: AuthorActionTypes.DELETE_AUTHOR;
// 	payload: string;
// }

export type AuthorsAction = IFetchAuthors | IFetchAuthorsError;
// | IAddAuthor
// | IDeleteAuthor;
