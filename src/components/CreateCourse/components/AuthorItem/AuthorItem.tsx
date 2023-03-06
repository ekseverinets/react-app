import React from 'react';

import { AuthorItemProps } from './AuthorItem.types';

import { Button } from '../../../../common/Button/Button';

export const AuthorItem = ({
	authorName,
	handleAuthor,
	btnText,
}: AuthorItemProps) => (
	<>
		{authorName}
		<Button text={btnText} onClick={handleAuthor} />
	</>
);
