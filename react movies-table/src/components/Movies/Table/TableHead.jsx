import React, { useState } from 'react';

export const TableHead = ({ columns, onSorting, isCheckAll, handleCheckAll }) => {

	const [sortingColumn, setSortingColumn] = useState(null);
	const [sortingOrder, setSortingOrder] = useState('asc');

	const sortingHandler = (column) => {
		const order = (column === sortingColumn && sortingOrder === 'asc') ? 'desc' : 'asc';
		setSortingColumn(column);
		setSortingOrder(order);
		onSorting(column, order);
	}

	return <thead>
					<tr>
						<th>
							<span className='custom-checkbox'>
								<input 
									type='checkbox' 
									id='selectAll' 
									checked={isCheckAll}
									onChange={e => {handleCheckAll(e.target.checked)}}
								/>
								<label></label>
							</span>
						</th>
						{columns.map(column => (
							<th key={column.name}
								className={column.sortable ? 'sortable' : ''}
								onClick={() => (column.sortable ? sortingHandler(column.name) : null)}
							>
								{column.label}
								{column.sortable && sortingColumn === column.name &&
									<i className='large material-icons'>
										{sortingOrder === 'asc' ? 'arrow_downward' : 'arrow_upward'}
									</i>
								}
							</th>)
						)}
					</tr>
				</thead>
};

export default TableHead;


