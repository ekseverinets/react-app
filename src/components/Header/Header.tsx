import React, { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { IPaths } from '../../constants';

import { Logo } from './components/Logo/Logo';

import { Button } from 'src/common/Button/Button';

import styles from './Header.module.css';

export interface IHeader {
	name: string;
	auth: boolean;
	setUserName: React.Dispatch<React.SetStateAction<string>>;
	setAuthState: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: FC<IHeader> = ({ name, auth, setUserName, setAuthState }) => {
	const navigate = useNavigate();

	return (
		<header className={styles.header}>
			<Logo auth={auth} />
			{auth && (
				<div className={styles.authInfo}>
					<span>{name}</span>
					<Button
						text='Logout'
						onClick={() => {
							setUserName('');
							localStorage.clear();
							setAuthState(false);
							navigate(IPaths.Login);
						}}
					/>
				</div>
			)}
			{!auth && (
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
