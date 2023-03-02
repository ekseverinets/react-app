import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ICourse, IAuthor } from '../../../../models';
import {
	getCourseAuthor,
	getCourseDuration,
	getCreationDate,
} from '../../../../helpers';
import { Button } from '../../../../common/Button/Button';

import styles from './CourseCard.module.css';
import { deleteCourseAction } from '../../../../store/courses/actions';

interface ICourseCardProps extends ICourse {
	updatedAuthors: IAuthor[];
}

export const CourseCard: FC<ICourseCardProps> = ({
	id,
	title,
	description,
	duration,
	creationDate,
	authors,
	updatedAuthors,
}) => {
	const dispatch = useDispatch();
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
