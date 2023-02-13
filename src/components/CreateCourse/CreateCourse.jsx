import React, { useState, useCallback } from 'react';

import { getCourseDuration, UUID } from '../../helpers';

//import styles from './CreateCourse.module.css';

import InputField from '../../common/InputField/InputField';

import { AuthorItem } from './components/AuthorItem/AuthorItem';
import { CreateAuthorForm } from './components/CreateAuthorForm/CreateAuthorForm';

import { mockedAuthorsList } from '../../constants';

const CreateCourse = ({ updateCourse }) => {
	const [form, setForm] = useState({
		courseTitle: '',
		courseDesc: '',
		courseDuration: '',
	});

	const [courseAuthors, setCourseAuthors] = useState([]);
	const [authors, addAuthor] = useState(mockedAuthorsList);

	const onInputValidate = (value, name) => {
		setError((prev) => ({
			...prev,
			[name]: { ...prev[name], errorMsg: value },
		}));
	};

	const [error, setError] = useState({
		courseTitle: {
			isReq: true,
			errorMsg: '',
			onValidateFunc: onInputValidate,
		},
		courseDesc: {
			isReq: true,
			errorMsg: '',
			onValidateFunc: onInputValidate,
		},
		courseDuration: {
			isReq: true,
			errorMsg: '',
			onValidateFunc: onInputValidate,
		},
	});

	const onInputChange = useCallback((value, name) => {
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	}, []);

	const validateForm = () => {
		let isInvalid = false;
		Object.keys(error).forEach((x) => {
			const errObj = error[x];
			if (errObj.errorMsg) {
				isInvalid = true;
			} else if (errObj.isReq && !form[x]) {
				isInvalid = true;
				onInputValidate(true, x);
			}
		});
		return !isInvalid;
	};

	const handleSubmit = () => {
		const isValid = validateForm();
		if (!isValid) {
			console.error('Invalid Form!');
			return false;
		}

		if (courseAuthors.length === 0) {
			alert('Please add Course Authors');
			console.error('Invalid Form!');
			return false;
		}

		const requestCourseBody = {
			creationDate: new Date().toLocaleDateString('en-GB'),
			description: form.courseDesc,
			duration: parseInt(form.courseDuration),
			id: UUID(),
			title: form.courseTitle,
			authors: courseAuthors.map((item) => item.id),
		};

		updateCourse(requestCourseBody);
	};

	const handleAddAuthor = (name) => {
		const newAuthor = {
			id: UUID(),
			name,
		};

		addAuthor((prevState) => [...prevState, newAuthor]);
	};

	return (
		<div className='form'>
			<InputField
				type='text'
				name={12345}
				title='Title'
				value={form.courseTitle}
				min={2}
				onChangeFunc={onInputChange}
				{...error.courseTitle}
			/>
			<InputField
				type='textarea'
				name='courseDesc'
				title='Description'
				value={form.courseDesc}
				min={2}
				onChangeFunc={onInputChange}
				{...error.courseDesc}
			/>
			<div>
				<h2>Add author</h2>
				<div>
					<CreateAuthorForm onAddAuthor={handleAddAuthor} />
				</div>
			</div>
			<InputField
				type='number'
				name='courseDuration'
				title='Duration'
				value={form.courseDuration}
				min={1}
				onChangeFunc={onInputChange}
				{...error.courseDuration}
			/>
			<p>
				<span>Duration: </span>
				{getCourseDuration(form.courseDuration)}
			</p>

			<div>
				<div>
					<h2>Authors</h2>
					<ul>
						{authors
							.filter((author) => !courseAuthors.includes(author))
							.map((author) => (
								<li key={author.id}>
									<AuthorItem
										authorName={author.name}
										handleAuthor={() => {
											setCourseAuthors((prevState) => [...prevState, author]);
										}}
										btnText={'Add author'}
									/>
								</li>
							))}
					</ul>
				</div>
				<div>
					<h2>Course Authors</h2>
					<ul>
						{courseAuthors.length === 0 && 'Author list is empty'}
						{courseAuthors.map((courseAutor) => (
							<li key={courseAutor.id}>
								<AuthorItem
									authorName={courseAutor.name}
									handleAuthor={() => {
										setCourseAuthors((prevState) =>
											prevState.filter((itemId) => itemId !== courseAutor.id)
										);
									}}
									btnText={'delete'}
								/>
							</li>
						))}
					</ul>
				</div>
			</div>
			<button onClick={handleSubmit}>Create course</button>
		</div>
	);
};

export default CreateCourse;
