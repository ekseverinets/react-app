import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Courses.module.css';

import { CourseCard } from './components/CourseCard/CourseCard';

import { IPaths } from 'src/constants';

import { ICourse, IAuthor } from '../../models';

import { Button } from 'src/common/Button/Button';

interface CoursesProps {
	courses: ICourse[];
	updatedAuthors: IAuthor[];
}

const Courses: FC<CoursesProps> = ({ courses, updatedAuthors }) => {
	const navigate = useNavigate();

	return (
		<section>
			<div className={styles.btnWrap}>
				<Button
					text='Add new course'
					onClick={() => navigate(IPaths.CoursesAdd)}
				/>
			</div>
			<ul className={styles.coursesList}>
				{courses.map((course) => (
					<CourseCard
						key={course.id}
						{...course}
						updatedAuthors={updatedAuthors}
					/>
				))}
			</ul>
		</section>
	);
};

export default Courses;
