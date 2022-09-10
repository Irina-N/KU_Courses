import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Container } from 'react-bootstrap/';

import Navigation from '../Navigation/Navigation';

import './app.css';

export const App = () => {

	return (
		<Suspense fallback='loading...'>
			<Container className='justufy-content-center'>
				<Navigation />
				<Outlet />
			</Container>
		</Suspense>
	);
}

export default App;