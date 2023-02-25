import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './components';

import { IHeader } from './components/Header/Header';

const App: FC<IHeader> = ({ name, auth, setUserName, setAuthState }) => {
	return (
		<>
			<Header
				name={name}
				auth={auth}
				setUserName={setUserName}
				setAuthState={setAuthState}
			/>
			<Outlet />
		</>
	);
};

export default App;
