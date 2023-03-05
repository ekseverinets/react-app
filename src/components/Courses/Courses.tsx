import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getCourses } from '../../store/courses/selectors';
import { fetchCourses } from 'src/store/courses/actions';

import { IPaths } from 'src/constants';
import { CourseCard } from './components/CourseCard/CourseCard';
import { Button } from 'src/common/Button/Button';

import styles from './Courses.module.css';

const Courses = () => {
	const { courses } = useAppSelector(getCourses);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchCourses());
	}, []);

	return (
		<>
			<section>
				<div className={styles.btnWrap}>
					<Button
						text='Add new course'
						onClick={() => navigate(IPaths.CoursesAdd)}
					/>
				</div>
				<ul className={styles.coursesList}>
					{courses.map((course) => (
						<CourseCard key={course.id} {...course} />
					))}
				</ul>
			</section>
		</>
	);
};

export default Courses;
