import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './i18n';

import App from './components/App/App';
import MoviesTable from './components/Movies/Table/MoviesTable';
import MoviePage from './components/Movies/MoviePage/MoviePage';
import HomePage from './components/HomePage/HomePage';
import AboutPage from './components/AboutPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route exact path='/' element = {<App />} >
					<Route index element = { <HomePage/>} />
					<Route exact path='movies' element={<MoviesTable />} />
					<Route path='/movies/:movieId' element={<MoviePage />} />
					<Route path='about' element={<AboutPage/>} />
					<Route path='*' element={ <HomePage/>} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

