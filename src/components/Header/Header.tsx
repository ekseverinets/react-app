import React from 'react';
import { NavLink } from 'react-router-dom';

import { IPaths } from '../../constants';

import { Logo } from './components/Logo/Logo';

import { Button } from 'src/common/Button/Button';

import styles from './Header.module.css';

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
		{!auth && (
			<div>
				<div className={styles.linkWrap}>
					<NavLink
						to={IPaths.Registration}
						className={({ isActive }) => (isActive ? styles.active : undefined)}
					>
						Registration
					</NavLink>
				</div>
				<div className={styles.linkWrap}>
					<NavLink
						to={IPaths.Login}
						className={({ isActive }) => (isActive ? styles.active : undefined)}
					>
						Login
					</NavLink>
				</div>
			</div>
		)}
	</header>
);

export default Header;
