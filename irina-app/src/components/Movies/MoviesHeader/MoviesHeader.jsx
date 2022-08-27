import React from 'react';

import { useTranslation } from 'react-i18next';
import { Row, Col, Button } from 'react-bootstrap/';

import './moviesHeader.css';

export const MoviesHeader = ({avgRating, changeCurrentAction, handleDeleteChecked}) => {

	const { t } = useTranslation();
	
	const starStyles = {
		fontSize: `${avgRating + 10}px`,
		color: `${avgRating > 0 ? 'gold' : 'white'}`,
	};

	return (
		<Row className='table-title pt-4 pb-4'>
			<Col sm={5} className='ps-0'>
				<h2>
					Manage <b>Movies</b>
				</h2>
				<h4 className='d-flex'>
					{t('movies.header.avRating')} <b className='ms-2'>{avgRating}</b> <i className='material-icons star' style={starStyles}>star</i>{' '}
				</h4>
			</Col>
			<Col
				sm={7}
				className='d-flex align-items-center justify-content-end pe-0'
			>
				<Button
					variant='success'
					onClick={() => {changeCurrentAction('createItem')}}
				>
					<i className='material-icons'>&#xE147;</i> <span>{t('movies.header.addBtn')}</span>
				</Button>
				<Button
					variant='danger'
					onClick={handleDeleteChecked}
				>
					<i className='material-icons'>&#xE15C;</i> <span>{t('movies.header.delBtn')}</span>
				</Button>
			</Col>
		</Row>
	);
};

export default MoviesHeader;
