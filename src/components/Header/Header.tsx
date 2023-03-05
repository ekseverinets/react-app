import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUser, logoutUser } from '../../store/user/actions';
import { getUser } from 'src/store/user/selectors';

import { IPaths } from '../../constants';
import { Logo } from './components/Logo/Logo';
import { Button } from 'src/common/Button/Button';

import styles from './Header.module.css';

const Header = () => {
	const { result } = useAppSelector(getUser);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const token = localStorage.getItem('token');

	useEffect(() => {
		dispatch(fetchUser(token));
	}, []);

	const handleLogout = () => {
		dispatch(logoutUser());
		localStorage.clear();
		navigate(IPaths.Login);
	};

	return (
		<header className={styles.header}>
			<Logo auth={result.successful} />
			{result.successful ? (
				<div className={styles.authInfo}>
					<span>
						{typeof result.result === 'object'
							? result.result.role === 'user'
								? result.result.name
								: 'admin'
							: ''}
					</span>
					<Button text='Logout' onClick={handleLogout} />
				</div>
			) : (
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
