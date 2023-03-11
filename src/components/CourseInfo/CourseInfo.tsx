import React from 'react';
import { useNavigate, Navigate, useParams } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';
import { getCourses } from '../../store/courses/selectors';
import { getAuthors } from '../../store/authors/selectors';

import { IPaths } from '../../constants/constants';
import {
	getCourseAuthor,
	getCourseDuration,
	getCreationDate,
} from '../../helpers';
import { Button } from 'src/common/Button/Button';

import styles from './CourseInfo.module.css';

const CourseInfo = () => {
	const courses = useAppSelector(getCourses);
	const authors = useAppSelector(getAuthors);
	const navigate = useNavigate();
	const { courseId } = useParams();

	const course = courses.courses.find(({ id }) => id === courseId);

	if (!course) {
		return <Navigate to={IPaths.Courses} />;
	}

	return (
		<section className={styles.courseInfo}>
			<Button text='Back to courses' onClick={() => navigate(IPaths.Courses)} />
			<article key={course.id} className={styles.courseInfoWrap}>
				<div className={styles.courseInfoDesc}>
					<h1>{course.title}</h1>
					<p>{course.description}</p>
				</div>
				<div className={styles.courseInfoDetails}>
					<p>
						<span>ID:</span> {course.id}
					</p>
					<p>
						<span>Duration:</span> {getCourseDuration(course.duration)}
					</p>
					<p>
						<span>Created:</span> {getCreationDate(course.creationDate)}
					</p>
					<p>
						<span>Authors:</span>{' '}
						{getCourseAuthor(course.authors, authors.authors)}
					</p>
				</div>
			</article>
		</section>
	);
};

export default CourseInfo;
