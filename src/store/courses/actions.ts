import { CourseActionTypes } from './types';
import apiClient from '../../services';

export const fetchCourses = () => async (dispatch) => {
	try {
		dispatch({ type: CourseActionTypes.FETCH_COURSES });
		const response = await apiClient.get('/courses/all');

		dispatch({
			type: CourseActionTypes.FETCH_COURSES_SUCCESS,
			payload: response.data.result,
		});
	} catch (e) {
		dispatch({
			type: CourseActionTypes.FETCH_COURSES_ERROR,
			payload: `${e}`,
		});
	}
};

export const addCourseAction = (payload) => ({
	type: CourseActionTypes.ADD_COURSE,
	payload,
});

export const deleteCourseAction = (payload) => ({
	type: CourseActionTypes.DELETE_COURSE,
	payload,
});
