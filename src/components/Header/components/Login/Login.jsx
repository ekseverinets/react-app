import React from 'react';

import { Button } from '../../../../common/Button/Button';

import styles from './Login.module.css';

export const Login = () => {
	const name = 'Josh Perez';
	const BUTTON_TEXT = 'Logout';

	return (
		<div className={styles.login}>
			<span>{name}</span>
			<Button text={BUTTON_TEXT} />
		</div>
	);
};
