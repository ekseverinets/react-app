import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { IPaths } from 'src/constants';

interface AuthProps {
	auth: boolean;
	children: JSX.Element;
}

export const RequireAuth: FC<AuthProps> = ({ auth, children }) => {
	if (!auth) {
		return <Navigate to={IPaths.Login} />;
	}

	return children;
};
