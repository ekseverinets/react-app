import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { IPaths } from 'src/constants';

interface AuthProps {
	children: JSX.Element;
}

export const RequireAuth: FC<AuthProps> = ({ children }) => {
	if (!localStorage.getItem('user-info')) {
		return <Navigate to={IPaths.Login} />;
	}

	return children;
};
