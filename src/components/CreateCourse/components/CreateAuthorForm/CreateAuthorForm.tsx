import React, { useState } from 'react';

import { Button } from '../../../../common/Button/Button';

import styles from './CreateAuthorForm.module.css';

export const CreateAuthorForm = ({ onAddAuthor }) => {
	const [author, setAuthor] = useState<string>('');

	return (
		<>
			<input
				className={styles.authorInput}
				placeholder='Add a new author'
				value={author}
				onChange={(event) => setAuthor(event.target.value)}
			/>

			<Button
				text='Create author'
				onClick={() => {
					setAuthor('');
					onAddAuthor(author);
				}}
			/>
		</>
	);
};
