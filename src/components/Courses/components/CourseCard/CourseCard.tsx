import React, { FC } from 'react';

import styles from './CourseCard.module.css';

import { Button } from '../../../../common/Button/Button';

export interface ICourse {
	id: string;
	title: string;
	description: string;
	duration: number;
	creationDate: string;
	authors: string[];
}

export const CourseCard: FC<ICourse> = ({
	title,
	description,
	duration,
	creationDate,
	authors,
}) => {
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
						{authors}
					</span>
				</p>
				<p>
					<span>Duration:</span> {duration}
				</p>
				<p>
					<span>Created:</span> {creationDateFormatted}
				</p>
				<Button
					text='Show course'
					// eslint-disable-next-line @typescript-eslint/no-empty-function
					onClick={() => {}}
				/>
			</div>
		</li>
	);
};
