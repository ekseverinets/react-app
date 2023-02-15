import React from 'react';

import styles from './Header.module.css';

import { Logo } from './components/Logo/Logo';
import { Login } from './components/Login/Login';

const Header = () => {
	return (
		<header className={styles.header}>
			<Logo />
			<Login />
		</header>
	);
};

export default Header;
