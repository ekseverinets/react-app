import React, { FC } from 'react';
import { useNavigate, Navigate, useParams } from 'react-router-dom';

import { ICourse } from '../Courses/components/CourseCard/CourseCard';
import { IPaths } from 'src/constants';

import { Button } from 'src/common/Button/Button';

import { getCourseDuration } from '../../helpers';

import styles from './CourseInfo.module.css';

interface CoursesProps {
	courses: ICourse[];
}

const CourseInfo: FC<CoursesProps> = ({ courses }) => {
	const navigate = useNavigate();
	const { courseId } = useParams();

	const course = courses.find((course) => course.id === courseId);

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
						<span>Created:</span> {course.creationDate}
					</p>
					<p>
						<span>Authors:</span> {course.authors}
					</p>
				</div>
			</article>
		</section>
	);
};

export default CourseInfo;
