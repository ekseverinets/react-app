import { ICourse } from '../../models';

export interface ICourseCard {
	title: string;
	description: string;
	duration: number;
	authors: string[];
}

export enum CourseActionTypes {
	FETCH_COURSES = 'FETCH_COURSES',
	FETCH_COURSES_ERROR = 'FETCH_COURSES_ERROR',
	ADD_COURSE = 'ADD_COURSE',
	DELETE_COURSE = 'DELETE_COURSE',
}

interface IFetchCourses {
	type: CourseActionTypes.FETCH_COURSES;
	payload: ICourse[];
}

interface IFetchCoursesError {
	type: CourseActionTypes.FETCH_COURSES_ERROR;
	payload: string;
}

interface IAddCourse {
	type: CourseActionTypes.ADD_COURSE;
	payload: ICourseCard;
}

interface IDeleteCourse {
	type: CourseActionTypes.DELETE_COURSE;
	payload: string;
}

export type CoursesAction =
	| IFetchCourses
	| IFetchCoursesError
	| IAddCourse
	| IDeleteCourse;
