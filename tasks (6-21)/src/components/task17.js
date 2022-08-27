import React from 'react';

const Task17 = () => {

	const animals = ['dog', 'cat', 'chicken', 'cow', 'sheep', 'horse'];

	return (
		<div id='task17' className='task d-flex flex-column align-items-center'>
			<h1 className='task-header'>Task 17</h1>
			<ul>
				{animals.map( animal => <li key={animal}>{animal}</li>)}
			</ul>
		</div >
	);
}

export default Task17;
