import React from 'react';

import styles from './Header.module.css';

import { HeaderProps } from './Header.types.ts';

import { Logo } from './components/Logo/Logo';
import { Login } from './components/Login/Login';

const Header = (props) => {
	return (
		<>
			<header className={styles.header}>
				<Logo />
				<Login />
			</header>
		</>
	);
};

export default Header;
