import React, { useState } from 'react';

import { Button } from 'react-bootstrap';


const Task16 = () => {

	const [diceNo, setDiceNo] = useState(1);
	const [history, setHistory] = useState([]);
	const [intervalId, setIntervalId] = useState(0);

	const onClickHandler = (e) => {

		if (e.target.name === 'start' && !intervalId) {
			const generateRandomDiceNo = setInterval(() => {
				setDiceNo(Math.floor(Math.random() * 5) + 1);
			}, 100);
			setIntervalId(generateRandomDiceNo);
		} else if (e.target.name === 'stop' && intervalId) {
			clearInterval(intervalId);
			setIntervalId(0);
			setHistory([...history, diceNo]);
		}
	};


	return (
		<div id='Task16' className='task'>
			<h1 className='task-header'>Task 16</h1>

			<div className='d-flex flex-column align-items-center'>

				<Dice value={diceNo}></Dice>
				<p className='pt-4 pb-2'>
					{history.length > 0 && history.join(', ')}
				</p>
				<Button
					variant={intervalId ? 'danger' : 'success'}
					name={intervalId ? 'stop' : 'start'}
					onClick={e => onClickHandler(e)}
				>
					{intervalId ? 'Stop' : 'Start'}
				</Button>
			</div>
		</div >
	);
}

const Dice = ({ value }) => {

	return (
		<img className='dice' src={`img/no-${value}.png`} alt={`dice-${value}-dots`} width='150' height='150' ></img>
	);
};

export default Task16;
