import { CourseActionTypes, CoursesAction } from './types';
import { ICourse } from '../../models';

export interface ICoursesInitialState {
	courses: ICourse[];
}

const coursesInitialState = {
	courses: [],
};

export const coursesReducer = (
	state: ICoursesInitialState = coursesInitialState,
	action: CoursesAction
): ICoursesInitialState => {
	switch (action.type) {
		case CourseActionTypes.FETCH_COURSES:
			return {
				courses: action.payload,
			};

		case CourseActionTypes.FETCH_COURSES_ERROR:
			return { courses: [] };

		case CourseActionTypes.ADD_COURSE:
			return { courses: [] };

		case CourseActionTypes.DELETE_COURSE: {
			const deletedCourseId = state.courses.findIndex(
				({ id }) => id === action.payload
			);
			const courses = [...state.courses];
			courses.splice(deletedCourseId, 1);
			return { courses };
		}

		default:
			return state;
	}
};
