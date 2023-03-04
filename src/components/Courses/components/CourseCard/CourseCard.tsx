import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../../store/hooks';
import { getCourseDuration, getCreationDate } from '../../../../helpers';
import { deleteCourseAction } from '../../../../store/courses/actions';

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
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	// const authors = useAppSelector(getAuthors);
	console.log(authors);

	return (
		<li className={styles.card}>
			<div className={styles.desc}>
				<h1>{title}</h1>
				<p>{description}</p>
			</div>
			<div className={styles.details}>
				<p>
					{/* <span>Authors:</span> {getCourseAuthor(authors, updatedAuthors)} */}
				</p>
				<p>
					<span>Duration:</span> {getCourseDuration(duration)}
				</p>
				<p>
					<span>Created:</span> {getCreationDate(creationDate)}
				</p>
				<Button text='Show course' onClick={() => navigate(`${id}`)} />
				<div className={styles.btnsWrap}>
					<Button
						text='Delete'
						onClick={() => dispatch(deleteCourseAction({ id }))}
					/>
					<Button
						text='Update'
						onClick={() => alert('I will be added in the next module')}
					/>
				</div>
			</div>
		</li>
	);
};
