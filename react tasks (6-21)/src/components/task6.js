import React, { useState } from 'react';

const Task6 = () => {

	const [btnValue, setBtnValue] = useState('Hover me');
	let [btnWidth, setBtnWidth] = useState(100);
	let [btnHeight, setBtnHeight] = useState(40);
	const [intervalId, setIntervalId] = useState(0);

	const styleBlock = {
		width: `${btnWidth}px`,
		height: `${btnHeight}px`,
		maxWidth: '700px',
		maxHeight: '200px',
		margin: '8px auto',
		padding: '3px 8px',
		border: '1px solid #aaa',
		borderRadius: '5px',
		backgroundColor: '#ccc',
		cursor: 'pointer',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}

	const onMouseDownHandler = (e) => {
		e.target.style.backgroundColor = 'lightgreen';
		setBtnValue('HOLD ME');
		const newIntervalId = setInterval(() => {
      setBtnWidth(btnWidth++);
			setBtnHeight(btnHeight++);
		}, 50);
    setIntervalId(newIntervalId);
	};

	const onMouseUpHandler = () => {
		clearInterval(intervalId); 
		setIntervalId(0);
		setBtnWidth(100);
		setBtnHeight(40);
		setBtnValue('Click me!');
	}

	const onClickHandler = (e) => {
		e.target.style.backgroundColor = 'tomato'
		setBtnValue('HOLD ME');
	}

	const onMouseOutHandler = (e) => {
		if (intervalId) {
			clearInterval(intervalId); 
			setIntervalId(0); 
		}
		e.target.style.backgroundColor = '#ccc';
		setBtnValue('Hover me');
	}

	return (
		<div id='Task6' className='task'>
			<h1 className='task-header'>Task 6</h1>
			
				<div style={styleBlock} 
					onMouseEnter={ () => setBtnValue('Click me!')}
					onClick={ (e) => onClickHandler(e)}
					onMouseDown={ (e) => onMouseDownHandler(e)}
					onMouseUp={onMouseUpHandler}
					onMouseOut={(e) => onMouseOutHandler(e)}
				> 
					{btnValue} 
				</div>
				
			
			
		</div >
	);
}

export default Task6;
