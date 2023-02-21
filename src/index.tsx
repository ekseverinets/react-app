import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './index.css';

import LoginForm from './components/Login/Login';
import RegistrationForm from './components/Registration/Registration';
import { Courses, CreateCourse } from './components';
import { ICourse } from './components/Courses/components/CourseCard/CourseCard';

import { MOCKED_COURSES_LIST, MOCKED_AUTHORS_LIST } from './constants';
import { getCourseDuration, getCourseAuthor } from './helpers';

const root = ReactDOM.createRoot(document.getElementById('root'));

const RootComponent = () => {
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
		authors: getCourseAuthor(item.authors, authors),
	}));

	return (
		<Routes>
			<Route path='/' element={<App />}>
				<Route path='/login' element={<LoginForm />} />
				<Route path='/registration' element={<RegistrationForm />} />
				<Route
					path='/courses'
					element={<Courses courses={coursesWithAuthors} />}
				/>
				<Route
					path='/courses/add'
					element={
						<CreateCourse
							updateCourse={handleUpdateCourses}
							updateAuthors={handleUpdateAuthors}
							updatedAuthors={authors}
						/>
					}
				/>
				<Route path='/courses/:id' element={<p>Hello</p>} />
				<Route path='*' element={<Navigate to='/' />} />
			</Route>
		</Routes>
	);
};

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<RootComponent />
		</BrowserRouter>
	</React.StrictMode>
);
