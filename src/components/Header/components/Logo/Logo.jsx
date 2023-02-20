import React from 'react';

import logo from '../../../../assets/logo.png';

import styles from './Logo.module.css';

export const Logo = () => {
	return (
		<div className={styles.logo}>
			<img src={logo} alt='Logo' />
		</div>
	);
};
