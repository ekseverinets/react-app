import { CourseActionTypes, ICourseCard } from './types';
import { apiClient } from '../../services';
import { AppDispatch } from '../index';
import { IUrls } from '../../constants/api';
import { getToken } from '../../constants/constants';

export const fetchCourses = () => async (dispatch: AppDispatch) => {
	try {
		const response = await apiClient.get(IUrls.get_courses_URL);

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
			const response = await apiClient.post(
				IUrls.add_course_URL,
				anotherCourse,
				{
					headers: {
						Authorization: getToken(),
					},
				}
			);

			dispatch({
				type: CourseActionTypes.ADD_COURSE,
				payload: response.data.result,
			});

			const coursesResponse = await apiClient.get(IUrls.get_courses_URL);

			dispatch({
				type: CourseActionTypes.FETCH_COURSES,
				payload: coursesResponse.data.result,
			});
		} catch (error) {
			dispatch({
				type: CourseActionTypes.FETCH_COURSES_ERROR,
				payload: `${error}`,
			});
		}
	};

export const deleteCourse = (id: string) => async (dispatch: AppDispatch) => {
	try {
		const response = await apiClient.delete(`/courses/${id}`, {
			headers: {
				Authorization: getToken(),
			},
		});

		dispatch({
			type: CourseActionTypes.DELETE_COURSE,
			payload: response.data.result,
		});

		const coursesResponse = await apiClient.get(IUrls.get_courses_URL);

		dispatch({
			type: CourseActionTypes.FETCH_COURSES,
			payload: coursesResponse.data.result,
		});
	} catch (error) {
		dispatch({
			type: CourseActionTypes.FETCH_COURSES_ERROR,
			payload: `${error}`,
		});
	}
};
