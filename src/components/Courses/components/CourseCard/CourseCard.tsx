import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../../common/Button/Button';

import {
	getCourseAuthor,
	getCourseDuration,
	getCreationDate,
} from '../../../../helpers';

import styles from './CourseCard.module.css';

export interface ICourse {
	id: string;
	title: string;
	description: string;
	duration: number;
	creationDate: string;
	authors: string[];
}

// export interface IAuthors {
// 	updatedAuthors: string[];
// }

export const CourseCard = ({
	id,
	title,
	description,
	duration,
	creationDate,
	authors,
	updatedAuthors,
}) => {
	const navigate = useNavigate();

	return (
		<li className={styles.card}>
			<div className={styles.desc}>
				<h1>{title}</h1>
				<p>{description}</p>
			</div>
			<div className={styles.details}>
				<p>
					<span>Authors:</span> {getCourseAuthor(authors, updatedAuthors)}
				</p>
				<p>
					<span>Duration:</span> {getCourseDuration(duration)}
				</p>
				<p>
					<span>Created:</span> {getCreationDate(creationDate)}
				</p>
				<Button text='Show course' onClick={() => navigate(`${id}`)} />
			</div>
		</li>
	);
};
