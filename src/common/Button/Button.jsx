import React from 'react';

import styles from './Button.module.css';

export const Button = (props) => {
	return (
		<button className={styles.button} onClick={props.onClick}>
			{props.text}
		</button>
	);
};
