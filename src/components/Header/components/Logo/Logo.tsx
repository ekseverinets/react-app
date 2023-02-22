import React from 'react';
import { Link } from 'react-router-dom';

import { IPaths } from 'src/constants';

import logo from '../../../../assets/logo.png';

import styles from './Logo.module.css';

export const Logo = () => {
	return (
		<Link to={IPaths.Home}>
			<div className={styles.logo}>
				<img src={logo} alt='Logo' />
			</div>
		</Link>
	);
};
