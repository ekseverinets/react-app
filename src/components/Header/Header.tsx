import React, { FC, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { IPaths } from '../../constants';
import { Logo } from './components/Logo/Logo';
import { Button } from 'src/common/Button/Button';

import styles from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/store';
import { fetchUser, logoutUser } from 'src/store/user/actions';
import { getUser } from 'src/store/user/selectors';

const Header = () => {
	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();

	const { result } = useSelector(getUser);

	const localData = localStorage.getItem('token');
	console.log(result);

	useEffect(() => {
		dispatch(fetchUser(localData));
	}, []);

	const handleLogout = () => {
		dispatch(logoutUser());
		localStorage.clear();
		navigate(IPaths.Login);
	};

	return (
		<header className={styles.header}>
			<Logo />
			<div className={styles.authInfo}>
				<span>{result.name}</span>
				<Button text='Logout' onClick={handleLogout} />
			</div>
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
		</header>
	);
};

export default Header;
