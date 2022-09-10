import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Button, Row } from 'react-bootstrap/';

import { Movies } from '../../../common/data';

import './moviePage.css';

export const MoviePage = () => {

	const { movies } = Movies;
	const { movieId } = useParams();
	const navigate = useNavigate();

	const currentMovie = movies.filter(movie => +movieId === +movie.id)[0];

	return <Row>
		{ currentMovie ? (
			<article className='content-wrapper'>
				<header className='content-title'>
					<h2 className='text-center'>{currentMovie.title}</h2>
					<h6 className='text-center'>{currentMovie.year}</h6>
				</header>
				<section className='content-block'>
					<div className='movie-info'>
						<p><strong>Director: </strong>{currentMovie.director}</p>
						<p><strong>Genres: </strong>{currentMovie.genres.join(', ')}</p>
					</div>
					<div className='movie-plot'>
						<p><strong>Plot:</strong></p>
						<p>{currentMovie.plot}</p>
					</div>
				</section>
			</article>
		) : (
			<div className='movie-wrapper'>
				<p className='msg-text'>Movie is not found</p>
			</div>
			
		)}

		<Button onClick={() => navigate(-1)} className='btn-back'>Back</Button>		
	</Row>
};

export default MoviePage;
