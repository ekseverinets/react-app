import React from 'react';

import { Button } from '../../../../common/Button/Button';

import { AuthorItemProps } from './AuthorItem.types';

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
