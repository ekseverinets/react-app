import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './components';

import { IHeader } from './components/Header/Header';

const App: FC<IHeader> = ({ userData, handleSetUser }) => {
	return (
		<>
			<Header userData={userData} handleSetUser={handleSetUser} />
			<Outlet />
		</>
	);
};

export default App;
