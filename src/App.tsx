import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './components';

const App = ({ name, auth, setUserName, setAuthState }) => {
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
