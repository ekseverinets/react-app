import React, { useState } from 'react';

import { Button } from '../../../../common/Button/Button';

export const CreateAuthorForm = ({ onAddAuthor }) => {
	const [author, setAuthor] = useState('');
	const BUTTON_TEXT = 'Create author';

	return (
		<>
			<input
				placeholder='Add a new author'
				value={author}
				onChange={(event) => setAuthor(event.target.value)}
			/>

			<Button
				text={BUTTON_TEXT}
				onClick={() => {
					setAuthor('');
					onAddAuthor(author);
				}}
			/>
		</>
	);
};
