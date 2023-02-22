import React, { useState } from 'react';
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
import { getCourseDuration, getCourseAuthor } from '../../helpers';

export const RootComponent = () => {
	const [courses, updateCourse] = useState<ICourse[]>(MOCKED_COURSES_LIST);
	const [authors, setUpdatedAuthors] = useState(MOCKED_AUTHORS_LIST);

	const handleUpdateCourses = (course) => {
		updateCourse((prevState) => [...prevState, course]);
	};

	const handleUpdateAuthors = (newAuthor) => {
		setUpdatedAuthors((prevState) => [...prevState, newAuthor]);
	};

	const coursesWithAuthors = courses.map((item) => ({
		...item,
		duration: getCourseDuration(item.duration),
		creationDate: item.creationDate.replace(/[/]/g, '.'),
		authors: getCourseAuthor(item.authors, authors),
	}));

	return (
		<Routes>
			<Route path={IPaths.Home} element={<App />}>
				<Route path={IPaths.Login} element={<LoginForm />} />
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
