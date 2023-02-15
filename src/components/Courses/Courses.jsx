import React from 'react';

import styles from './Courses.module.css';

import { CourseCard } from './components/CourseCard/CourseCard';

const Courses = ({ courses }) => {
	return (
		<section>
			<div className={styles.searchBarWrap}>
				<div className={styles.searchBar}></div>
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
