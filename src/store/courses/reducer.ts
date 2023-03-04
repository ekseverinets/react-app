import { CourseActionTypes, CoursesAction } from './types';
import { ICourse } from '../../models';

export interface ICoursesInitialState {
	courses: ICourse[];
	loading: boolean;
	error: string | null;
}

const coursesInitialState = {
	courses: [],
	loading: false,
	error: null,
};

export const coursesReducer = (
	state: ICoursesInitialState = coursesInitialState,
	action: CoursesAction
): ICoursesInitialState => {
	switch (action.type) {
		case CourseActionTypes.FETCH_COURSES:
			return {
				error: null,
				loading: false,
				courses: action.payload,
			};

		case CourseActionTypes.FETCH_COURSES_ERROR:
			return { loading: false, error: action.payload, courses: [] };

		case CourseActionTypes.ADD_COURSE:
			return { error: null, loading: false, courses: [] };

		case CourseActionTypes.DELETE_COURSE: {
			const deletedCourseId = state.courses.findIndex(
				({ id }) => id === action.payload
			);
			const courses = [...state.courses];
			courses.splice(deletedCourseId, 1);
			return { error: null, loading: false, courses };
		}

		default:
			return state;
	}
};
