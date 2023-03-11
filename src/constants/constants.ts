export enum IPaths {
	Home = '/',
	Login = '/login',
	Registration = '/registration',
	Courses = '/courses',
	CoursesAdd = '/courses/add',
	Course = '/courses/:courseId',
	NotFound = '*',
}

export const getToken = () => localStorage.getItem('token');
export const setToken = (token: string) => localStorage.setItem('token', token);
