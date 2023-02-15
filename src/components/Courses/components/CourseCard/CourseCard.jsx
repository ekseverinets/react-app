import React from 'react';

import styles from './CourseCard.module.css';

import { getCourseDuration, getCourseAuthor } from '../../../../helpers';

import { MOCKED_AUTHORS_LIST } from '../../../../constants';

import { Button } from '../../../../common/Button/Button';

export const CourseCard = ({
	title,
	description,
	duration,
	creationDate,
	authors,
}) => {
	const courseAuthors = getCourseAuthor(authors, MOCKED_AUTHORS_LIST);
	const creationDateFormatted = creationDate.replace(/[/]/g, '.');

	return (
		<li className={styles.card}>
			<div className={styles.desc}>
				<h1>{title}</h1>
				<p>{description}</p>
			</div>
			<div className={styles.details}>
				<p>
					<span>
						Authors:
						{courseAuthors}
					</span>
				</p>
				<p>
					<span>Duration:</span> {getCourseDuration(duration)}
				</p>
				<p>
					<span>Created:</span> {creationDateFormatted}
				</p>
				<Button text='Show course' />
			</div>
		</li>
	);
};
