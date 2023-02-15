import React from 'react';

import styles from './CourseCard.module.css';

import { getCourseDuration, getCourseAuthor } from '../../../../helpers';

import { mockedAuthorsList } from '../../../../constants';

import { Button } from '../../../../common/Button/Button';

export const CourseCard = ({
	title,
	description,
	duration,
	creationDate,
	authors,
}) => {
	const BUTTON_TEXT = 'Show course';
	const AUTHORS_LIST = mockedAuthorsList;
	const courseAuthors = getCourseAuthor(authors, AUTHORS_LIST);
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
				<Button text={BUTTON_TEXT} />
			</div>
		</li>
	);
};
