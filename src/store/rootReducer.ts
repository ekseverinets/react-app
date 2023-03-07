import { authorsReducer } from './authors/reducer';
import { coursesReducer } from './courses/reducer';
import { userReducer } from './user/reducer';

export const rootReducer = {
	authors: authorsReducer,
	courses: coursesReducer,
	user: userReducer,
};
