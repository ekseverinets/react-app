import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { IPaths } from 'src/constants';
import { CourseCard } from './components/CourseCard/CourseCard';
import { Button } from 'src/common/Button/Button';

import styles from './Courses.module.css';

import { getCourses } from '../../store/courses/selectors';
import { getAuthors } from '../../store/authors/selectors';
import { fetchCourses } from 'src/store/courses/actions';
import { AppDispatch } from 'src/store';

const Courses = () => {
	const courses = useSelector(getCourses);
	const authors = useSelector(getAuthors);

	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchCourses());
	}, []);

	const coursesData = courses.courses;

	return (
		<>
			{courses.loading ? (
				<h2>Loading courses</h2>
			) : (
				<section>
					<div className={styles.btnWrap}>
						<Button
							text='Add new course'
							onClick={() => navigate(IPaths.CoursesAdd)}
						/>
					</div>
					<ul className={styles.coursesList}>
						{coursesData.map((course) => (
							<CourseCard
								key={course.id}
								{...course}
								updatedAuthors={authors}
							/>
						))}
					</ul>
				</section>
			)}
		</>
	);
};

export default Courses;
