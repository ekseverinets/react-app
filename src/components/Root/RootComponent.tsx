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

import { getCourseAuthor } from '../../helpers';
import { RequireAuth } from './RequireAuth';

export const RootComponent = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [courses, updateCourse] = useState<ICourse[]>(MOCKED_COURSES_LIST);
	const [authors, setUpdatedAuthors] =
		useState<{ id: string; name: string }[]>(MOCKED_AUTHORS_LIST);
	const [name, setName] = useState<string>('');
	const [auth, setAuth] = useState<boolean>(false);

	useEffect(() => {
		const authToken = JSON.parse(localStorage.getItem('token'));
		if (authToken) {
			setAuth(true);
		}

		if (location.pathname === IPaths.Home) {
			navigate(IPaths.Courses);
		}
	}, []);

	const handleAuth = (auth: boolean) => {
		setAuth(auth);
	};

	const handleUserName = (name: string) => {
		setName(name);
	};

	const handleUpdateCourses = (course) => {
		updateCourse((prevState) => [...prevState, course]);
	};

	const handleUpdateAuthors = (newAuthor) => {
		setUpdatedAuthors((prevState) => [...prevState, newAuthor]);
	};

	const coursesWithAuthors = courses.map((item) => ({
		...item,
		creationDate: item.creationDate.replace(/[/]/g, '.'),
		authors: getCourseAuthor(item.authors, authors),
	}));

	return (
		<Routes>
			<Route
				path={IPaths.Home}
				element={
					<App
						name={name}
						auth={auth}
						setUserName={handleUserName}
						setAuthState={handleAuth}
					/>
				}
			>
				<Route
					path={IPaths.Login}
					element={
						<LoginForm setUserName={handleUserName} setAuthState={handleAuth} />
					}
				/>
				<Route path={IPaths.Registration} element={<RegistrationForm />} />
				<Route
					path={IPaths.Courses}
					element={
						<RequireAuth auth={auth}>
							<Courses courses={coursesWithAuthors} />
						</RequireAuth>
					}
				/>
				<Route
					path={IPaths.CoursesAdd}
					element={
						<RequireAuth auth={auth}>
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
						<RequireAuth auth={auth}>
							<CourseInfo courses={coursesWithAuthors} />
						</RequireAuth>
					}
				/>
				<Route
					path={IPaths.NotFound}
					element={
						<RequireAuth auth={auth}>
							<Navigate to={IPaths.Courses} />
						</RequireAuth>
					}
				/>
			</Route>
		</Routes>
	);
};
