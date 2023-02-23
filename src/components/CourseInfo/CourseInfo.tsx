import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ICourse } from '../Courses/components/CourseCard/CourseCard';
import { IPaths } from 'src/constants';

import { Button } from 'src/common/Button/Button';

import { getCourseDuration } from '../../helpers';

import styles from './CourseInfo.module.css';

interface CoursesProps {
	courses: ICourse[];
}

const CourseInfo: FC<CoursesProps> = ({ courses }) => {
	const BUTTON_TEXT = 'Back to courses';
	const navigate = useNavigate();
	const { id } = useParams();

	return (
		<section className={styles.courseInfo}>
			<Button text={BUTTON_TEXT} onClick={() => navigate(IPaths.Courses)} />
			{courses
				.filter((course) => course.id === id)
				.map((course) => (
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
				))}
		</section>
	);
};

export default CourseInfo;
