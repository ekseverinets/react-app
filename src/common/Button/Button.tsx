import React, { FC } from 'react';

import { ButtonProps } from './Button.types';

import styles from './Button.module.css';

export const Button: FC<ButtonProps> = ({ onClick, text }) => {
	return (
		<button className={styles.button} onClick={onClick}>
			{text}
		</button>
	);
};
