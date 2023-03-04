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

export const addCourseAction =
	(anotherCourse: ICourseCard) => async (dispatch: AppDispatch) => {
		try {
			const currentUser = localStorage.getItem('token');

			await apiClient.post('/courses/add', anotherCourse, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `${currentUser}`,
				},
			});

			dispatch({
				type: CourseActionTypes.ADD_COURSE,
				payload: anotherCourse,
			});
		} catch (error) {
			const [errorMessage] = error.response.data.errors;

			dispatch({
				type: CourseActionTypes.FETCH_COURSES_ERROR,
				payload: `${errorMessage}`,
			});
		}
	};

export const deleteCourseAction = (payload: { id: string }) => ({
	type: CourseActionTypes.DELETE_COURSE,
	payload,
});
