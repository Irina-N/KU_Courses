import React, { useEffect, useState } from 'react';


export const Task15 = () => {

	const getData = () => {
		return [1, 2, 3, 4, 5];
	}

	const [nums, setNums] = useState([]);

	useEffect(() => {
		setNums(getData());
	}, []);

	const getRandomNum = () => {
		return Math.floor(Math.random() * 101);
	};

	const delNum = () => {
		if (nums.length > 0) {
			setNums([...nums.slice(0, -1)]);
		};
	};

	const addNum = () => {
		setNums([getRandomNum(), ...nums]);
	};

	const styleSquare = {
		width: '35px', 
		height: '35px', 
		margin: '5px', 
		backgroundColor: '#ccc',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: '1px solid #aaa',
		borderRadius: '5px',
		fontWeight: 700,
		lineHeigth: 1
	};

	const styleBtn = {
		width: 'fit-content', 
		height: '40px', 
		margin: '5px',
		padding: '3px 8px',
		borderRadius: '5px',
		borderColor: 'transparent',
		fontWeight: 500
	}

	return (
		<div id='task14' className='task d-flex flex-column align-items-center'>
			<h1 className='task-header'>Task 15</h1>
			<div className='d-flex flex-column align-items-center'>
				<div className='d-flex'>
					<button onClick={delNum} style={{...styleBtn, backgroundColor: 'tomato'}} >Delete item</button>
					<button onClick={addNum} style={{...styleBtn, backgroundColor: 'lightgreen'}}>Add item</button>				
				</div>
				<div className='d-flex flex-wrap'>{nums.map((num, i) => {return <div key={i} style={styleSquare}>{num}</div>} )}</div>
			</div>
		</div>
	);
};

export default Task15;
