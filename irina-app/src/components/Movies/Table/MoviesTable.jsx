import React, { useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Row, Col, Form, InputGroup, Table } from 'react-bootstrap/';

import { Movies } from '../../../common/data';
import { MoviesHeader } from '../MoviesHeader/MoviesHeader';
import { TableHead } from './TableHead';
import { Movie } from '../Movie';
import { PaginationComponent as Pagination } from './Pagination/Pagination';
import { DeleteModal } from '../DeleteModal';
import { CreateEditModal } from '../CreateEditModal/CreateEditModal';

import './table.css';

export const MoviesTable = () => {

	const [data, setData] = useState([]);
	const [totalItems, setTotalItems] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState('');
	const [search, setSearch] = useState('');
	const [filterValue, setFilterValue] = useState('');
	const [sorting, setSorting] = useState({ column: '', order: '' });
	const [avgRating, setAvgRating] = useState(0);
	const [currentAction, setCurrentAction] = useState('');
	const [modalShow, setModalShow] = useState({createItem: false, editItem: false, deleteItem: false});
	const [itemsToBeChanged, setItemsToBeChanged] = useState([]);
	const [lastId, setLastId] = useState(null);
	const [checkedItems, setCheckedItems] = useState([]);
	const [isCheckAll, setIsCheckAll] = useState(false);

	const { t } = useTranslation();

	const { movies, genres } = Movies;

	let genresOptions = genres.sort().map((genre, index) => <option key={index} value={genre}>{genre}</option>);

	const pageNumbers = [20, 30, 40, 50, movies.length];

	const pageNumbersList = pageNumbers.map((num, index) => {
		if (index === pageNumbers.length - 1) {
			return <option key={index} value={totalItems}>All</option>
		} else {
			return <option key={index} value={num}>{num}</option>
		}
	});

	const columns = [
		{ label: t('movies.tableTitles.title'), name: 'title', sortable: true },
		{ label: t('movies.tableTitles.plot'), name: 'plot', sortable: false },
		{ label: t('movies.tableTitles.director'), name: 'director', sortable: true },
		{ label: t('movies.tableTitles.genres'), name: 'genres', sortable: false },
		{ label: t('movies.tableTitles.year'), name: 'year', sortable: true },
		{ label: t('movies.tableTitles.actions'), name: 'actions', sortable: false },
		{ label: t('movies.tableTitles.rating'), name: 'rating', sortable: true }
	];

	const getAvgRating = (moviesArr) => {
		const ratings = moviesArr.filter(movie => movie.rating).map(movie => movie.rating);
		if (ratings.length === 0) {
			return 0;
		}
		const avg = ratings.reduce(((raitingsSum, movieRating) => raitingsSum + movieRating), 0) / ratings.length;
		return avg.toFixed(1) / 1;
	}

	useEffect(() => {
		if (movies.length) {
			const moviesData = movies.map(movie => {
				return {
					id: movie.id,
					title: movie.title,
					plot: movie.plot,
					director: movie.director,
					genres: [...movie.genres],
					year: movie.year,
					rating: Math.floor(Math.random() * 11)
				}
			});
			setData(moviesData);
			setAvgRating(getAvgRating(moviesData));
			setTotalItems(moviesData.length);
			let maxId = moviesData.reduce((acc, current) => acc.id > current.id ? acc : current).id;
			setLastId(maxId);
		}
		setItemsPerPage(pageNumbers[0]);
	}, []);

	useEffect(() => {
		if (currentAction) {
			setModalShow({...modalShow, [currentAction]: true});
		}	
	}, [currentAction]);

	useEffect(() => {
		isCheckAll ? setCheckedItems([...filteredResult.map(item => +item.id)]) : setCheckedItems([]);
	}, [isCheckAll]);

	const onHideHandler = () => {
		setModalShow({...modalShow, [currentAction]: false});
		setCurrentAction(null);
		setItemsToBeChanged([]);
	};

	const addNewItem = (newItem) => {
		if (itemsPerPage === data.length) {
			setItemsPerPage(itemsPerPage + 1);
		};
		setData(data => {return [...data, newItem]});
		setTotalItems(data.length);
		setAvgRating(getAvgRating(data));
		setLastId(newItem.id);
		setCurrentAction(null);
	};

	const editItem = (editedItem) => {
		const index = data.findIndex(item => item.id === editedItem.id);		
		const newData = [...data];
		newData[index] = editedItem;
		setData([...newData]);
		setItemsToBeChanged([]);
		setCurrentAction(null);
	}

	const deleteItems = (itemsArr) => {
		let updatedCheckedItems = [...checkedItems];
		
		itemsArr.forEach(item => {
			updatedCheckedItems = updatedCheckedItems.filter(checkedItem => +checkedItem.id !== +item.id);
		})
		
		setCheckedItems([...updatedCheckedItems]);
		setModalShow({...modalShow, deleteItem: false})
		itemsArr.forEach(item => {
			setData(data => [...data.filter(el => +el.id !== +item.id)]);
		});
		setTotalItems(data.length);
		setItemsToBeChanged([]);
		setCurrentAction(null);
		setIsCheckAll(false);
	};

	const handleCheck = (id, checked) => {
		checked ? 
		setCheckedItems([...checkedItems, +id]) : 
		setCheckedItems([...checkedItems.filter(item => +item !== +id)]);
	}

	const handleCheckAll = (isChecked) => {
		setIsCheckAll(isChecked);
	}	

	const handleDeleteChecked = () => {
		const updatedItemsToBeChanged = [...filteredResult
																			.filter(item => checkedItems.includes(+item.id))]
																			.map(item => item.id);
		setItemsToBeChanged([...updatedItemsToBeChanged]);
		setCurrentAction('deleteItem');
	}

	const changeRating = (id, newRating) => {
		const index = data.findIndex(item => item.id === id);
		const newData = [...data];
		newData[index].rating = newRating;
		setData([...newData]);
	};

	const filteredResult = useMemo(() => {
		let filteredResult = data;

		if (filterValue) {
			setIsCheckAll(false);
			filteredResult = filteredResult.filter(movie => movie.genres.some(genre => genre === filterValue));
		}

		if (search) {
			setIsCheckAll(false);
			const searchVal = search.toLowerCase().trim().replace(/ {1,}/g,' ');
			filteredResult = filteredResult.filter(movie => {
				return (
					movie.title.toLowerCase().indexOf(searchVal) !== -1
					||
					movie.director.toLowerCase().indexOf(searchVal) !== -1
					||
					movie.plot.toLowerCase().indexOf(searchVal) !== -1
					||
					movie.year.toString().indexOf(searchVal) !== -1)
			});
		}

		if (sorting.column) {
			const column = sorting.column;
			filteredResult.sort((movie1, movie2) => {
				let result = 1;

				if (sorting.order === 'asc') {
					result = (movie2[column] < movie1[column]) ? 1 : -1;
				} else {
					result = (movie2[column] < movie1[column]) ? -1 : 1;
				}
				return result;
			})
		}

		setTotalItems(filteredResult.length);

		filteredResult.length ? setAvgRating(getAvgRating(filteredResult)) : setAvgRating(0);

		return filteredResult.slice(
			(currentPage - 1) * itemsPerPage,
			(currentPage - 1) * itemsPerPage + itemsPerPage
		);

	}, [data, currentPage, filterValue, search, sorting, itemsPerPage]);


	return (
		< >
			<div className='table-wrapper'>
				<MoviesHeader 
					avgRating={avgRating} 
					changeCurrentAction={(actionName) => setCurrentAction(actionName)}
					handleDeleteChecked={handleDeleteChecked}
				/>
				<Pagination
					totalItems={totalItems}
					itemsPerPage={itemsPerPage}
					itemsOnPage={filteredResult.length}
					currentPage={currentPage}
					onPageChange={(page) => setCurrentPage(page)}
				/>
				<Row className='mt-3 mb-3 d-flex align-items-center'>
					<Col sm={2}>
						<InputGroup >
							<InputGroup.Text id='inputGroup-sizing-sm'>Show</InputGroup.Text>
							<Form.Select
								onChange={e => { 
									setItemsPerPage(+e.target.value);
									setCurrentPage(1)
								}}
							>
								{pageNumbersList}
							</Form.Select>
						</InputGroup>
					</Col>
					<Col sm={7}>
						<Form.Control
							placeholder='I want to find...'
							onChange={e => setSearch(e.target.value)}
						/>
					</Col>
					<Col className='ms-auto'>
						<Form.Select 
							onChange={e => {
								setFilterValue(e.target.value);
								setCurrentPage(1)
							}}
						>
							<option value=''>Select genre</option>
							{genresOptions}
						</Form.Select>
					</Col>
				</Row>

				<Table className='table table-striped table-hover mb-4 mt-2'>
					<TableHead
						columns={columns}
						onSorting={(column, order) => {setSorting({column, order})}}
						maxId = {lastId}
						handleCheckAll = {handleCheckAll}
						isCheckAll={isCheckAll}
					/>

					<tbody>
						{filteredResult.map(
							movie => <Movie 
													key={movie.id} 
													movie={movie}
													changeRating={changeRating}
													changeCurrentAction={(actionName) => setCurrentAction(actionName)}
													selectCurrentItem={(id) => setItemsToBeChanged([id])}
													handleCheck={handleCheck}
													checked={checkedItems.includes(+movie.id)}
												/>)
						}
					</tbody>
				</Table>
				<Pagination
					totalItems={totalItems}
					itemsPerPage={itemsPerPage}
					itemsOnPage={filteredResult.length}
					currentPage={currentPage}
					onPageChange={(page) => setCurrentPage(page)}
				/>
			</div>
			<DeleteModal
				isShown={modalShow.deleteItem}
				onHide={onHideHandler}
				deleteItems={deleteItems}
				itemsToBeRemoved={filteredResult.filter(item => itemsToBeChanged.includes(+item.id)) }
			/>
			<CreateEditModal
				isShown={modalShow.createItem|| modalShow.editItem}
				onHide={onHideHandler}
				addNewItem={addNewItem}
				editItem={editItem}
				itemToBeChanged={filteredResult.find(item => +item.id === +itemsToBeChanged[0])}
				maxId = {lastId}
				genres={genres}
				currentAction={currentAction}
			/>
		</>
	);
};

export default MoviesTable;
