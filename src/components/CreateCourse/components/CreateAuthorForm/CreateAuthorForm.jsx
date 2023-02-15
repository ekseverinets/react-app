import React, { useState } from 'react';

import { Button } from '../../../../common/Button/Button';

export const CreateAuthorForm = ({ onAddAuthor }) => {
	const [author, setAuthor] = useState('');

	return (
		<>
			<input
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
