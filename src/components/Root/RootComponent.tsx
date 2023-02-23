import React, { useState, useEffect } from 'react';
import App from 'src/App';

import { Routes, Route, Navigate } from 'react-router-dom';

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

export const RootComponent = () => {
	const [courses, updateCourse] = useState<ICourse[]>(MOCKED_COURSES_LIST);
	const [authors, setUpdatedAuthors] = useState(MOCKED_AUTHORS_LIST);
	const [name, setName] = useState('');
	const [auth, setAuth] = useState(false);

	useEffect(() => {
		const auth = JSON.parse(localStorage.getItem('token'));
		if (auth) {
			setAuth(true);
		}
	}, [auth]);

	const handleAuth = (auth) => {
		setAuth(auth);
	};

	const handleUpdateCourses = (course) => {
		updateCourse((prevState) => [...prevState, course]);
	};

	const handleUpdateAuthors = (newAuthor) => {
		setUpdatedAuthors((prevState) => [...prevState, newAuthor]);
	};

	const handleUserName = (name) => {
		setName(name);
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
					element={<Courses courses={coursesWithAuthors} />}
				/>
				<Route
					path={IPaths.CoursesAdd}
					element={
						<CreateCourse
							updateCourse={handleUpdateCourses}
							updateAuthors={handleUpdateAuthors}
						/>
					}
				/>
				<Route
					path={IPaths.Course}
					element={<CourseInfo courses={coursesWithAuthors} />}
				/>
				<Route path={IPaths.NotFound} element={<Navigate to='/' />} />
			</Route>
		</Routes>
	);
};
