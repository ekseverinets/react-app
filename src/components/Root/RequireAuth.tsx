import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { IPaths } from 'src/constants';

interface AuthProps {
	auth: boolean;
	children: JSX.Element;
}

export const RequireAuth: FC<AuthProps> = ({ auth, children }) => {
	const location = useLocation();

	if (!auth) {
		return <Navigate to={IPaths.Login} state={{ from: location }} replace />;
	}

	return children;
};
