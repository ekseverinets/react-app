import { CourseActionTypes } from './types';

const coursesInitialState = {
	courses: [],
	loading: false,
	error: null,
	anotherCourse: {
		title: '',
		description: '',
		duration: 0,
		authors: [],
	},
};

export const coursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		// case CourseActionTypes.FETCH_COURSES:
		// 	return { loading: true, courses: [] };

		case CourseActionTypes.FETCH_COURSES_SUCCESS:
			return { loading: false, courses: action.payload };

		case CourseActionTypes.FETCH_COURSES_ERROR:
			return { loading: false, error: action.payload, courses: [] };

		case CourseActionTypes.ADD_COURSE:
			return {
				loading: false,
				courses: [...state.courses, action.payload],
			};

		case CourseActionTypes.DELETE_COURSE: {
			const deletedCourseId = state.courses.findIndex(
				({ id }) => id === action.payload
			);
			const courses = [...state.courses];
			courses.splice(deletedCourseId, 1);
			return { loading: false, courses };
		}

		default:
			return state;
	}
};
