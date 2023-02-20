import React, { useState } from 'react';

import './App.css';

import { MOCKED_COURSES_LIST, MOCKED_AUTHORS_LIST } from './constants';
import { Header, Courses, CreateCourse } from './components';

import { Button } from './common/Button/Button';

const App = () => {
	const BUTTON_TEXT = 'Add new course';
	const [showCreateCourse, setCreateCourse] = useState(false);
	const [courses, updateCourse] = useState(MOCKED_COURSES_LIST);
	const [updatedAuthors, setUpdatedAuthors] = useState(MOCKED_AUTHORS_LIST);

	const handleShowCreateCourseClick = () => {
		setCreateCourse(!showCreateCourse);
	};

	const handleUpdateCourses = (course) => {
		updateCourse((prevState) => [...prevState, course]);
	};

	const handleUpdateAuthors = (newAuthor) => {
		setUpdatedAuthors((prevState) => [...prevState, newAuthor]);
	};

	return (
		<>
			<Header />
			<Button text={BUTTON_TEXT} onClick={handleShowCreateCourseClick} />
			{showCreateCourse && (
				<CreateCourse
					updateCourse={handleUpdateCourses}
					updateAuthors={handleUpdateAuthors}
					updatedAuthors={updatedAuthors}
				/>
			)}
			{!showCreateCourse && (
				<Courses courses={courses} updatedAuthors={updatedAuthors} />
			)}
		</>
	);
};

export default App;
