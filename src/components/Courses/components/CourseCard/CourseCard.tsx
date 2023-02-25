import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../../common/Button/Button';

import { getCourseDuration } from '../../../../helpers';

import styles from './CourseCard.module.css';

export interface ICourse {
	id: string;
	title: string;
	description: string;
	duration: number;
	creationDate: string;
	authors: string[];
}

export const CourseCard: FC<ICourse> = ({
	id,
	title,
	description,
	duration,
	creationDate,
	authors,
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
					<span>Authors:</span> {authors}
				</p>
				<p>
					<span>Duration:</span> {getCourseDuration(duration)}
				</p>
				<p>
					<span>Created:</span> {creationDate}
				</p>
				<Button text='Show course' onClick={() => navigate(`${id}`)} />
			</div>
		</li>
	);
};
