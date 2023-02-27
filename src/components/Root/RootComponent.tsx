import React, { useState, useEffect } from 'react';
import App from 'src/App';

import {
	Routes,
	Route,
	Navigate,
	useNavigate,
	useLocation,
} from 'react-router-dom';

import { IUser, ICourse, IAuthor } from '../../models';
import {
	MOCKED_COURSES_LIST,
	MOCKED_AUTHORS_LIST,
	IPaths,
} from '../../constants';

import { RequireAuth } from './RequireAuth';
import LoginForm from '../Login/Login';
import RegistrationForm from '../Registration/Registration';
import { Courses, CreateCourse, CourseInfo } from '../../components';

export const RootComponent = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [courses, updateCourse] = useState(MOCKED_COURSES_LIST);
	const [authors, setUpdatedAuthors] = useState<IAuthor[]>(MOCKED_AUTHORS_LIST);
	const [user, setUser] = useState<IUser>({
		isAuth: false,
		name: '',
		email: '',
		token: '',
	});

	useEffect(() => {
		const authToken = JSON.parse(localStorage.getItem('token'));
		if (authToken) {
			setUser((prevState) => ({
				...prevState,
				isAuth: true,
			}));
		}

		if (location.pathname === IPaths.Home) {
			navigate(IPaths.Courses);
		}
	}, []);

	const handleSetUser = (auth: boolean, name: string) => {
		setUser((prevState) => ({
			...prevState,
			isAuth: auth,
			name: name,
		}));
	};

	const handleUpdateCourses = (course: ICourse) => {
		updateCourse((prevState) => [...prevState, course]);
	};

	const handleUpdateAuthors = (newAuthor: IAuthor) => {
		setUpdatedAuthors((prevState) => [...prevState, newAuthor]);
	};

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
						<RequireAuth>
							<Courses courses={courses} updatedAuthors={authors} />
						</RequireAuth>
					}
				/>
				<Route
					path={IPaths.CoursesAdd}
					element={
						<RequireAuth>
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
						<RequireAuth>
							<CourseInfo courses={courses} updatedAuthors={authors} />
						</RequireAuth>
					}
				/>
				<Route
					path={IPaths.NotFound}
					element={
						<RequireAuth>
							<Navigate to={IPaths.Courses} />
						</RequireAuth>
					}
				/>
			</Route>
		</Routes>
	);
};
