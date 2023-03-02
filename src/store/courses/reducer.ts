import { CourseActionTypes } from './types';

const coursesInitialState = [];

export const coursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		case CourseActionTypes.FETCH_COURSES:
			return { loading: true, courses: [] };

		case CourseActionTypes.FETCH_COURSES_SUCCESS:
			return { loading: false, courses: action.payload };

		case CourseActionTypes.FETCH_COURSES_ERROR:
			return { loading: false, error: action.payload, courses: [] };

		case CourseActionTypes.ADD_COURSE:
			return { loading: false, courses: [...state, action.payload] };

		case CourseActionTypes.DELETE_COURSE: {
			const deletedCourseId = state.findIndex(
				({ id }) => id === action.payload
			);

			const courses = [...state];
			courses.splice(deletedCourseId, 1);
			return { loading: false, courses };
		}

		default:
			return state;
	}
};
