import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import { Header } from './components';

import { IPaths } from './constants';

import styles from './App.module.css';

const App = () => {
	return (
		<>
			<Header />
			<div className={styles.linkWrap}>
				<Link to={IPaths.Registration}>Registration</Link>
			</div>
			<div className={styles.linkWrap}>
				<Link to={IPaths.Login}>Login</Link>
			</div>
			<Outlet />
		</>
	);
};

export default App;
