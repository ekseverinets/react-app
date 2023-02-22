import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { RootComponent } from './components/Root/RootComponent';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<RootComponent />
		</BrowserRouter>
	</React.StrictMode>
);
