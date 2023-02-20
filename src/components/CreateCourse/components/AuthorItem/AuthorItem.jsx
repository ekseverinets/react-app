import React from 'react';

import { Button } from '../../../../common/Button/Button';

export const AuthorItem = ({ authorName, handleAuthor, btnText }) => (
	<>
		{authorName}
		<Button text={btnText} onClick={handleAuthor} />
	</>
);
