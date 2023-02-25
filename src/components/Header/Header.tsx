import React, { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { IPaths } from '../../constants';

import { Logo } from './components/Logo/Logo';

import { Button } from 'src/common/Button/Button';

import { IUser } from '../Root/RootComponent';

import styles from './Header.module.css';

export interface IHeader {
	userData: IUser;
	handleSetUser: (isAuth: boolean, user: string) => void;
}

const Header: FC<IHeader> = ({ userData, handleSetUser }) => {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.clear();
		navigate(IPaths.Login);
		handleSetUser(false, '');
	};

	return (
		<header className={styles.header}>
			<Logo auth={userData.isAuth} />
			{userData.isAuth && (
				<div className={styles.authInfo}>
					<span>{userData.name}</span>
					<Button text='Logout' onClick={handleLogout} />
				</div>
			)}
			{!userData.isAuth && (
				<div>
					<div className={styles.linkWrap}>
						<NavLink
							to={IPaths.Registration}
							className={({ isActive }) =>
								isActive ? styles.active : undefined
							}
						>
							Registration
						</NavLink>
					</div>
					<div className={styles.linkWrap}>
						<NavLink
							to={IPaths.Login}
							className={({ isActive }) =>
								isActive ? styles.active : undefined
							}
						>
							Login
						</NavLink>
					</div>
				</div>
			)}
		</header>
	);
};

export default Header;
