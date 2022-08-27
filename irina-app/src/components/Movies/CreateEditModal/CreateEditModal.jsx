import React, { useEffect, useState } from 'react';

import { Button, Modal, CloseButton, Form } from 'react-bootstrap/';

import './createEditModal.css';


export const CreateEditModal = ({ isShown, onHide, editItem, addNewItem, itemToBeChanged, maxId, currentAction, genres }) => {

	const [movie, setMovie] = useState({});

	useEffect(() => {
		setMovie({
			id: itemToBeChanged?.id ?? maxId + 1,
			title: itemToBeChanged?.title ?? '',
			plot: itemToBeChanged?.plot ?? '',
			director: itemToBeChanged?.director ?? '',
			genres: itemToBeChanged?.genres ?? [],
			year: itemToBeChanged?.year ?? '',
			rating: itemToBeChanged?.rating ?? 0
		});
	}, [itemToBeChanged, maxId]);

	const onChangeHandler = (e) => {
		const {name, value, type, checked} = e.target;
		if (type === 'checkbox') {			
			let updatedMovieGenres = checked ? 
				[...movie.genres, value] : 
				[...movie.genres].filter(genre => genre !== value);
			setMovie({ ...movie, genres: [...updatedMovieGenres] });
		} else {
			setMovie({ ...movie, [name]: value });
		}
	};

	return (
		currentAction === 'editItem' || currentAction === 'createItem' ? (
			<Modal
				show={isShown}
				size='lg'
				aria-labelledby='edit-modal'
				centered
			>
				<Modal.Header>
					<Modal.Title id='edit-modal'>
						<strong>{currentAction === 'createItem' ? 'Create Movie' : 'Edit Movie'}</strong>
					</Modal.Title>
					<CloseButton onClick={onHide} />
				</Modal.Header>

				<Modal.Body>
					<Form.Group className='mb-3' controlId='movieTitle'>
						<Form.Label>Title</Form.Label>
						<Form.Control
							type='text'
							name='title'
							required
							value={movie.title}
							onChange={e => onChangeHandler(e)}
							placeholder='Movie title'
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='moviePlot'>
						<Form.Label>Plot</Form.Label>
						<Form.Control
							as='textarea'
							rows={3}
							name='plot'
							value={movie.plot}
							onChange={e => onChangeHandler(e)}
							placeholder='Plot'
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='movieDirector'>
						<Form.Label>Director</Form.Label>
						<Form.Control
							type='text'
							name='director'
							value={movie.director}
							onChange={e => onChangeHandler(e)}
							placeholder='Director'
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='movieGenres'>
						<Form.Label>Genres</Form.Label><br/>
						{ genres.map((genre, i) => {return (
							<Form.Check
								key={i}
								inline
								label={genre}
								value={genre}
								name='genres'
								type='checkbox'
								onChange={e => onChangeHandler(e)}
								checked={movie?.genres.find(genreName => genreName === genre)}
							/>)})
						}
					</Form.Group>
					<Form.Group className='mb-3' controlId='movieYear'>
						<Form.Label>Year</Form.Label>
						<Form.Control
							type='text'
							name='year'
							value={movie.year}
							onChange={e => onChangeHandler(e)}
							placeholder='2022'
						/>
					</Form.Group>

				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={onHide}>Cancel</Button>
					{ 
						currentAction === 'createItem' && 
						<Button 
							variant='success'
							type='submit'
							onClick={() => addNewItem(movie)}
						>
							Create
						</Button>
					}

					{ 
						currentAction === 'editItem' && 
						<Button 
							variant='warning'
							type='submit'
							onClick={() => editItem(movie)}
						>
							Edit
						</Button>
					}
				</Modal.Footer>
			</Modal>
		) : <></>
	);
};

export default CreateEditModal;
