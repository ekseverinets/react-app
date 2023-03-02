import { MOCKED_AUTHORS_LIST } from '../../constants';
import { ADD_AUTHOR } from './types';

const authorsInitialState = MOCKED_AUTHORS_LIST;

export const authorsReducer = (state = authorsInitialState, action) => {
	switch (action.type) {
		case ADD_AUTHOR:
			return [...state, action.payload];

		default:
			return state;
	}
};
