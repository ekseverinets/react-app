import React, { useState } from 'react';

import { Button } from '../../../../common/Button/Button';

import styles from './CreateAuthorForm.module.css';

export const CreateAuthorForm = ({ onAddAuthor }) => {
	const [author, setAuthor] = useState('');

	return (
		<>
			<input
				className={styles.authorInput}
				placeholder='Add a new author'
				value={author}
				onChange={(event) => setAuthor(event.target.value)}
			/>

			<Button
				className={styles.authorBtn}
				text='Create author'
				onClick={() => {
					setAuthor('');
					onAddAuthor(author);
				}}
			/>
		</>
	);
};
