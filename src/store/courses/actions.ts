import { CourseActionTypes, ICourseCard } from './types';
import apiClient from '../../services';
import { AppDispatch } from '../index';

export const fetchCourses = () => async (dispatch: AppDispatch) => {
	try {
		const response = await apiClient.get('/courses/all');

		dispatch({
			type: CourseActionTypes.FETCH_COURSES,
			payload: response.data.result,
		});
	} catch (error) {
		dispatch({
			type: CourseActionTypes.FETCH_COURSES_ERROR,
			payload: `${error}`,
		});
	}
};

export const addCourse =
	(anotherCourse: ICourseCard) => async (dispatch: AppDispatch) => {
		try {
			const token = localStorage.getItem('token');

			await apiClient.post('/courses/add', anotherCourse, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `${token}`,
				},
			});

			const coursesResponse = await apiClient.get('/courses/all');

			dispatch({
				type: CourseActionTypes.FETCH_COURSES,
				payload: coursesResponse.data.result,
			});
		} catch (error) {
			const [errorMessage] = error.response.data.errors;

			dispatch({
				type: CourseActionTypes.FETCH_COURSES_ERROR,
				payload: `${errorMessage}`,
			});
		}
	};

export const deleteCourse = (id: string) => async (dispatch: AppDispatch) => {
	try {
		const token = localStorage.getItem('token');

		await apiClient.delete(`/courses/${id}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${token}`,
			},
		});

		const coursesResponse = await apiClient.get('/courses/all');

		dispatch({
			type: CourseActionTypes.FETCH_COURSES,
			payload: coursesResponse.data.result,
		});
	} catch (error) {
		const [errorMessage] = error.response.data.errors;

		dispatch({
			type: CourseActionTypes.FETCH_COURSES_ERROR,
			payload: `${errorMessage}`,
		});
	}
};
