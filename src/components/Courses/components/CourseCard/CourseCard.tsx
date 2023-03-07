import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { getAuthors } from '../../../../store/authors/selectors';
import { deleteCourse } from '../../../../store/courses/actions';
import { fetchAuthors } from '../../../../store/authors/actions';
import {
	getCourseAuthor,
	getCourseDuration,
	getCreationDate,
} from '../../../../helpers';

import { Button } from '../../../../common/Button/Button';

import styles from './CourseCard.module.css';

export const CourseCard = ({
	id,
	title,
	description,
	duration,
	creationDate,
	authors,
}) => {
	const updatedAuthors = useAppSelector(getAuthors);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchAuthors());
	}, []);

	return (
		<li className={styles.card}>
			<div className={styles.desc}>
				<h1>{title}</h1>
				<p>{description}</p>
			</div>
			<div className={styles.details}>
				<p>
					<span>Authors:</span>{' '}
					{getCourseAuthor(authors, updatedAuthors.authors)}
				</p>
				<p>
					<span>Duration:</span> {getCourseDuration(duration)}
				</p>
				<p>
					<span>Created:</span> {getCreationDate(creationDate)}
				</p>
				<Button text='Show course' onClick={() => navigate(`${id}`)} />
				<div className={styles.btnsWrap}>
					<Button text='Delete' onClick={() => dispatch(deleteCourse(id))} />
					<Button
						text='Update'
						onClick={() => alert('I will be added in the next module')}
					/>
				</div>
			</div>
		</li>
	);
};
