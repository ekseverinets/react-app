import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { IPaths } from 'src/constants';

import logo from '../../../../assets/logo.png';

import styles from './Logo.module.css';

interface LogoProps {
	auth: boolean;
}

export const Logo: FC<LogoProps> = (auth) => {
	return (
		<Link to={auth ? IPaths.Courses : IPaths.Login}>
			<div className={styles.logo}>
				<img src={logo} alt='Logo' />
			</div>
		</Link>
	);
};
