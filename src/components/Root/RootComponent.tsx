import React, { useState, useEffect } from 'react';
import App from 'src/App';

import {
	Routes,
	Route,
	Navigate,
	useNavigate,
	useLocation,
} from 'react-router-dom';

import LoginForm from '../Login/Login';
import RegistrationForm from '../Registration/Registration';
import { Courses, CreateCourse, CourseInfo } from '../../components';
import { ICourse } from '../Courses/components/CourseCard/CourseCard';

import {
	MOCKED_COURSES_LIST,
	MOCKED_AUTHORS_LIST,
	IPaths,
} from '../../constants';

import { getCourseAuthor, getCreationDate } from '../../helpers';
import { RequireAuth } from './RequireAuth';

export interface IUser {
	isAuth: boolean;
	name: string;
	email: string;
	token: string;
}

export const RootComponent = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [courses, updateCourse] = useState<ICourse[]>(MOCKED_COURSES_LIST);
	const [authors, setUpdatedAuthors] =
		useState<{ id: string; name: string }[]>(MOCKED_AUTHORS_LIST);

	const [user, setUser] = useState<IUser>({
		isAuth: false,
		name: '',
		email: '',
		token: '',
	});

	useEffect(() => {
		const authToken = JSON.parse(localStorage.getItem('token'));
		if (authToken) {
			setUser((prev) => ({
				...prev,
				isAuth: true,
			}));
		}

		if (location.pathname === IPaths.Home) {
			navigate(IPaths.Courses);
		}
	}, []);

	const handleSetUser = (auth: boolean, name: string) => {
		setUser((prev) => ({
			...prev,
			isAuth: auth,
			name: name,
		}));
	};

	const handleUpdateCourses = (course: ICourse) => {
		updateCourse((prevState) => [...prevState, course]);
	};

	const handleUpdateAuthors = (newAuthor: { id: string; name: string }) => {
		setUpdatedAuthors((prevState) => [...prevState, newAuthor]);
	};

	const coursesWithAuthors = courses.map((item) => ({
		...item,
		creationDate: getCreationDate(item.creationDate),
		authors: getCourseAuthor(item.authors, authors),
	}));

	return (
		<Routes>
			<Route
				path={IPaths.Home}
				element={<App userData={user} handleSetUser={handleSetUser} />}
			>
				<Route
					path={IPaths.Login}
					element={<LoginForm handleSetUser={handleSetUser} />}
				/>
				<Route path={IPaths.Registration} element={<RegistrationForm />} />
				<Route
					path={IPaths.Courses}
					element={
						<RequireAuth auth={user.isAuth}>
							<Courses courses={coursesWithAuthors} />
						</RequireAuth>
					}
				/>
				<Route
					path={IPaths.CoursesAdd}
					element={
						<RequireAuth auth={user.isAuth}>
							<CreateCourse
								updateCourse={handleUpdateCourses}
								updateAuthors={handleUpdateAuthors}
							/>
						</RequireAuth>
					}
				/>
				<Route
					path={IPaths.Course}
					element={
						<RequireAuth auth={user.isAuth}>
							<CourseInfo courses={coursesWithAuthors} />
						</RequireAuth>
					}
				/>
				<Route
					path={IPaths.NotFound}
					element={
						<RequireAuth auth={user.isAuth}>
							<Navigate to={IPaths.Courses} />
						</RequireAuth>
					}
				/>
			</Route>
		</Routes>
	);
};
