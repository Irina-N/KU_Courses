import React, { useState, useEffect, useMemo } from 'react';

import {Row, Col, Pagination} from 'react-bootstrap/';

import './pagination.css';

export const PaginationComponent = (
	{ totalItems = 0,
		itemsPerPage = 10,
		itemsOnPage = 0,
		currentPage = 1,
		onPageChange }) => {

	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		if (totalItems > 0 && itemsPerPage > 0)
			setTotalPages(Math.ceil(totalItems / itemsPerPage));
	}, [totalItems, itemsPerPage]);

	const paginationItems = useMemo(() => {
		const pages = [];
		for (let i = 1; i <= totalPages; i++) {
			pages.push(
				<Pagination.Item
					key={i}
					active={i === currentPage}
					onClick={() => onPageChange(i)}
				>
					{i}
				</Pagination.Item>
			);
		}
		return pages;
	}, [totalPages, currentPage, onPageChange]);


	return (
		<Row>
			<Col sm={3}className='hint-text'>
				Showing <b>{itemsOnPage}</b> out of <b>{totalItems}</b> movies
			</Col>
			{ (totalPages > 1 ) 
					&& 
				<Col sm={9}>
					<Pagination>
						<Pagination.Prev
							onClick={() => onPageChange(currentPage - 1)}
							disabled={currentPage === 1}
						/>
						{paginationItems}
						<Pagination.Next
							onClick={() => onPageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
						/>
				</Pagination>
				</Col>}
		</Row>
	);
};

export default PaginationComponent;


