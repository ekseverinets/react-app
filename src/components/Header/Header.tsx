import React from 'react';

import styles from './Header.module.css';

import { Logo } from './components/Logo/Logo';

import { Button } from 'src/common/Button/Button';

const Header = ({ name, auth, setUserName, setAuthState }) => (
	<header className={styles.header}>
		<Logo />
		{auth && (
			<div className={styles.authInfo}>
				<span>{name}</span>
				<Button
					text='Logout'
					onClick={() => {
						setUserName('');
						localStorage.clear();
						setAuthState(false);
					}}
				/>
			</div>
		)}
	</header>
);

export default Header;
