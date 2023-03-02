import { authorsReducer } from './authors/reducer';
import { coursesReducer } from './courses/reducer';

export const rootReducer = {
	authors: authorsReducer,
	courses: coursesReducer,
};
