import React, { useState } from 'react';

import './App.css';

import { mockedCoursesList } from './constants.js';

import { Header, Courses, CreateCourse } from './components';

import { Button } from './common/Button/Button';

const App = () => {
	const BUTTON_TEXT = 'Add new course';
	const [showCreateCourse, setCreateCourse] = useState(false);
	const [courses, updateCourse] = useState(mockedCoursesList);

	const handleShowCreateCourseClick = () => {
		setCreateCourse(!showCreateCourse);
	};

	const handleUpdateCourses = (course) => {
		updateCourse((prevState) => [...prevState, course]);
	};

	return (
		<>
			<Header />
			<Button text={BUTTON_TEXT} onClick={handleShowCreateCourseClick} />
			{showCreateCourse && <CreateCourse updateCourse={handleUpdateCourses} />}
			{!showCreateCourse && <Courses courses={courses} />}
		</>
	);
};

export default App;
