import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { ButtonGroup, Button } from 'react-bootstrap/';

export const Movie = ({ movie, changeRating, changeCurrentAction, selectCurrentItem, handleCheck, checked }) => {

	const { id, title, plot, director, genres, year } = movie;

	const [rating, setRating] = useState(movie.rating);

	const changeRatingHandler = (btnName) => {
		if (btnName === 'increase-btn' && rating < 10) {
			setRating(rating + 1);
			changeRating(id, rating + 1);
		} else if (btnName === 'decrease-btn' && rating > 0) {
			setRating(rating - 1);
			changeRating(id, rating - 1);
		}
	}

	return <tr>
					<td>
						<span className='custom-checkbox'>
							<input
								type='checkbox'
								value={id}
								checked={checked}
								onChange={e => handleCheck(e.target.value, e.target.checked)}
							/>
							<label></label>
						</span>
					</td>
					<th ><Link to={`/movies/${id}`} className='movie-link' data-toggle='tooltip'
						title='View'>{title}</Link></th>
					<td>{plot}</td>
					<td>{director}</td>
					<td>{genres.join(', ')}</td>
					<td>{year}</td>
					<td>
						<i
							className='material-icons edit-icon'
							data-toggle='tooltip'
							title='Edit'
							onClick={() => {
								selectCurrentItem(id);
								changeCurrentAction('editItem')
							}}
						>
							edit
						</i>
						<i
							className='material-icons delete-icon ms-2'
							data-toggle='tooltip'
							title='Delete'
							onClick={() => {
								selectCurrentItem(id);
								changeCurrentAction('deleteItem')
							}}
						>
							delete
						</i>
					</td>
					<td>
						<ButtonGroup>
							<Button
								variant='danger'
								size='sm'
								name='decrease-btn'
								disabled={rating < 1}
								onClick={e => rating > 0 && changeRatingHandler(e.target.name)}
							>
								-
							</Button>
							<Button className='rating' disabled variant='light' size='sm'>{rating}</Button>
							<Button
								variant='success'
								size='sm'
								name='increase-btn'
								disabled={rating >= 10}
								onClick={e => rating < 10 && changeRatingHandler(e.target.name)}
							>
								+
							</Button>
						</ButtonGroup>
					</td>
				</tr>
};

export default Movie;
