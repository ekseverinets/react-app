import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { IPaths } from '../../constants/constants';

interface AuthProps {
	children: JSX.Element;
}

export const RequireAuth: FC<AuthProps> = ({ children }) => {
	if (!localStorage.getItem('token')) {
		return <Navigate to={IPaths.Login} />;
	}

	return children;
};
