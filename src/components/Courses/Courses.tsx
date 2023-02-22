import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Courses.module.css';

import { CourseCard, ICourse } from './components/CourseCard/CourseCard';

import { IPaths } from 'src/constants';

import { Button } from 'src/common/Button/Button';

interface CoursesProps {
	courses: ICourse[];
}

const Courses: FC<CoursesProps> = ({ courses }) => {
	const BUTTON_TEXT = 'Add new course';
	const navigate = useNavigate();

	return (
		<section>
			<div className={styles.btnWrap}>
				<Button
					text={BUTTON_TEXT}
					onClick={() => navigate(IPaths.CoursesAdd)}
				/>
			</div>
			<ul className={styles.coursesList}>
				{courses.map((course) => (
					<CourseCard key={course.id} {...course} />
				))}
			</ul>
		</section>
	);
};

export default Courses;
