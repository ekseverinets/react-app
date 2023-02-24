import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { getCourseDuration, UUID } from '../../helpers';

import styles from './CreateCourse.module.css';

import InputField from '../../common/InputField/InputField';

import { AuthorItem } from './components/AuthorItem/AuthorItem';
import { CreateAuthorForm } from './components/CreateAuthorForm/CreateAuthorForm';

import { Button } from 'src/common/Button/Button';

import { MOCKED_AUTHORS_LIST, IPaths } from '../../constants';

const CreateCourse = ({ updateCourse, updateAuthors }) => {
	const navigate = useNavigate();

	const [form, setForm] = useState({
		courseTitle: '',
		courseDesc: '',
		courseDuration: '',
	});

	const [error, setError] = useState({
		courseTitle: {
			isReq: true,
			errorMsg: '',
		},
		courseDesc: {
			isReq: true,
			errorMsg: '',
		},
		courseDuration: {
			isReq: true,
			errorMsg: '',
		},
	});

	const [courseAuthors, setCourseAuthors] = useState([]);
	const [authors, addAuthor] = useState(MOCKED_AUTHORS_LIST);

	const onInputChange = useCallback((value, name) => {
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	}, []);

	const onValidateFunc = (value, name) => {
		setError((prev) => ({
			...prev,
			[name]: { ...prev[name], errorMsg: value },
		}));
	};

	const validateForm = () => {
		let isInvalid = false;
		Object.keys(error).forEach((errorItem) => {
			const errObj = error[errorItem];
			if (errObj.errorMsg) {
				isInvalid = true;
			} else if (errObj.isReq && !form[errorItem]) {
				isInvalid = true;
				onValidateFunc(true, errorItem);
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
		navigate(IPaths.Courses);
	};

	const handleAddAuthor = (name) => {
		const newAuthor = {
			id: UUID(),
			name,
		};

		addAuthor((prevState) => [...prevState, newAuthor]);
		updateAuthors(newAuthor);
	};

	return (
		<div className={styles.courseOuter}>
			<Button text='Back to courses' onClick={() => navigate(IPaths.Courses)} />
			<div className={styles.courseWrap}>
				<h1>Add a new Course</h1>
				<div className={styles.courseDesc}>
					<InputField
						type='text'
						name='courseTitle'
						title='Title'
						className={styles.descArea}
						value={form.courseTitle}
						min={2}
						onChangeFunc={onInputChange}
						onValidateFunc={onValidateFunc}
						{...error.courseTitle}
					/>
					<InputField
						type='textarea'
						name='courseDesc'
						title='Description'
						value={form.courseDesc}
						className={styles.descArea}
						min={2}
						onChangeFunc={onInputChange}
						onValidateFunc={onValidateFunc}
						{...error.courseDesc}
					/>
				</div>
				<div className={styles.newCourseInfo}>
					<div>
						<h2>Add author</h2>
						<div>
							<CreateAuthorForm onAddAuthor={handleAddAuthor} />
						</div>

						<InputField
							type='number'
							name='courseDuration'
							title='Duration'
							value={form.courseDuration}
							min={1}
							onChangeFunc={onInputChange}
							onValidateFunc={onValidateFunc}
							{...error.courseDuration}
						/>
						<p>
							<span>Duration: </span>
							{getCourseDuration(form.courseDuration)}
						</p>
					</div>

					<div>
						<div>
							<h2>Authors</h2>
							<ul>
								{authors
									.filter((author) => !new Set(courseAuthors).has(author))
									.map((author) => (
										<li key={author.id}>
											<AuthorItem
												authorName={author.name}
												handleAuthor={() => {
													setCourseAuthors((prevState) => [
														...prevState,
														author,
													]);
												}}
												btnText='Add author'
											/>
										</li>
									))}
							</ul>
						</div>
						<div>
							<h2>Course Authors</h2>
							<ul>
								{courseAuthors.length === 0 && 'Author list is empty'}
								{courseAuthors.map((courseAuthor) => (
									<li key={courseAuthor.id}>
										<AuthorItem
											authorName={courseAuthor.name}
											handleAuthor={() => {
												setCourseAuthors((prevState) =>
													prevState.filter(
														(item) => item.id !== courseAuthor.id
													)
												);
											}}
											btnText='delete'
										/>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
				<Button text='Create course' onClick={handleSubmit} />
			</div>
		</div>
	);
};

export default CreateCourse;
