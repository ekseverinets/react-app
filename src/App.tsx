import React from 'react';

import styles from './App.module.css';

import { Header } from './components';

import { Link, Outlet } from 'react-router-dom';

const App = () => {
	return (
		<>
			<Header />
			<div className={styles.linkWrap}>
				<Link to='/registration'>Registration</Link>
			</div>
			<div className={styles.linkWrap}>
				<Link to='/login'>Login</Link>
			</div>
			<Outlet />
		</>
	);
};

export default App;
