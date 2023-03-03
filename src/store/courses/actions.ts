import { CourseActionTypes } from './types';
import apiClient from '../../services';

export const fetchCourses = () => async (dispatch) => {
	try {
		//dispatch({ type: CourseActionTypes.FETCH_COURSES });
		const response = await apiClient.get('/courses/all');

		dispatch({
			type: CourseActionTypes.FETCH_COURSES_SUCCESS,
			payload: response.data.result,
		});
	} catch (error) {
		dispatch({
			type: CourseActionTypes.FETCH_COURSES_ERROR,
			payload: `${error}`,
		});
	}
};

export const addCourseAction = (anotherCourse) => async (dispatch) => {
	try {
		console.log(anotherCourse);
		const token = localStorage.getItem('token');

		const response = await apiClient.post('/courses/add', anotherCourse, {
			headers: {
				accept: '*/*',
				'Content-Type': 'application/json',
				Authorization: token,
			},
		});

		dispatch({
			type: CourseActionTypes.ADD_COURSE,
			payload: anotherCourse,
		});

		console.log(response);
	} catch (error) {
		console.log(`${error}`);
	}
};

export const deleteCourseAction = (payload) => ({
	type: CourseActionTypes.DELETE_COURSE,
	payload,
});
