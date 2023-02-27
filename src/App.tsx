import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { IHeader } from './components/Header/Header';
import { Header } from './components';

const App: FC<IHeader> = ({ userData, handleSetUser }) => {
	return (
		<>
			<Header userData={userData} handleSetUser={handleSetUser} />
			<Outlet />
		</>
	);
};

export default App;
