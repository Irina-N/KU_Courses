import React from 'react';

import { Table as TableBootstrap } from 'react-bootstrap/';

const Task19 = () => {

	const books = [
		{ author: 'Bill Gates', title: 'The Road Ahead', libraryID: 1254 },
		{ author: 'J. K. Rowling', title: 'Harry Potter', libraryID: 554 },
		{ author: 'Steve Jobs', title: 'Walter Isaacson', libraryID: 4264 },
		{ author: 'Suzanne Collins', title: 'Mockingjay: The Final Book of The Hunger Games', libraryID: 3245 }
	];


	const people = [
		{ name: 'Emil', email: 'emil@gmail.com', age: 16 },
		{ name: 'Tobias', email: 'tobias@gmail.com', age: 14 },
		{ name: 'Linus', email: 'linus@inbox.com', age: 10 }
	];

	return (
		<div id='task19' className='task d-flex flex-column align-items-center'>
			<h1 className='task-header'>Task 19</h1>
			<Table title='books' data={books} />
			<Table title='people' data={people} />
		</div >
	);
}

const Table = ({ title, data }) => {

	//funkcija, kuri ima objektą su duomenimis ir grąžina lėntelės ėilutę su stulpelių antraštėmis (ima tik pirmo masyvo objekto raktų pavadinimus)
	const getTableHeaders = (dataArr) => {
		return Object.keys(dataArr[0]).map( (header, i) => <th key={i} className='text-center'>{header.toUpperCase()}</th>);
	};

	//funkcija, kuri ima objektą su duomenimis ir grąžina kitas lėntelės ėilutes
	const getTableRows = (dataArr) => {
		return dataArr.map( (rowItem, i) => (
			<tr key={i}>
				{Object.keys(rowItem).map((name, i) => <td key={i}>{rowItem[name]}</td>)}
			</tr>));
	};

	return (<>
		{/* Žemiau tikriname, ar gavome visus duomenys, jeigu taip komponentas grąžiš lentelę, jeigu ne - pranešymas, kad duomenių nėra  */}
		{data.length && title ? (
			<div className='w-100 p-3'>
				<h4 className='text-center mb-3'>{title.toUpperCase()}</h4>
				<TableBootstrap bordered striped>
					<thead>
						<tr>
							{getTableHeaders(data)}
						</tr>
					</thead>
					<tbody>
						{getTableRows(data)}
					</tbody>
				</TableBootstrap></div>
		) : (
			<p>No data</p>
		)}
	</>);
}

export default Task19;
