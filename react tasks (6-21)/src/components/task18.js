import React from 'react';

import Table from 'react-bootstrap/Table';

const Task18 = () => {

	const books = [
		{ author: 'Bill Gates', title: 'The Road Ahead', libraryID: 1254 },
		{ author: 'J. K. Rowling', title: 'Harry Potter', libraryID: 554 },
		{ author: 'Steve Jobs', title: 'Walter Isaacson', libraryID: 4264 },
		{ author: 'Suzanne Collins', title: 'Mockingjay: The Final Book of The Hunger Games', libraryID: 3245 }
	];

	return (
		<div id='task18' className='task d-flex flex-column align-items-center'>
			<h1 className='task-header'>Task 18</h1>
			<Table bordered >
				<thead>
					<tr>
						{books.map(book => <th key={book.libraryID} style={{ backgroundColor: '#ccc', textAlign: 'center' }}>Library {book.libraryID}</th>)}
					</tr>
				</thead>
				<tbody>
					<tr>
						{books.map(book => <td key={book.libraryID}>{book.author}</td>)}
					</tr>
					<tr>
						{books.map(book => <td key={book.libraryID}>{book.title}</td>)}
					</tr>
				</tbody>
			</Table>

		</div >
	);
}

export default Task18;
