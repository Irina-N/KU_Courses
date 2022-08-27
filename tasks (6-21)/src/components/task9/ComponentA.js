import React, {useState}  from 'react';
import ComponentB from './ComponentB';

const ComponentA = () => {

	let [x, setX] = useState(1);
	let [y, setY] = useState(2);
	let [z, setZ] = useState(3);

	const increaseValues = () => {
		setX(x + 1);
		setY(y + 1);
		setZ(z + 1);
	}

	return (
		<div className='task'>
			<h3>Component A</h3>
				<div>
					<p>x = {x}</p>
					<p>y = {y}</p>
					<p>z = {z}</p>
				</div>
			<ComponentB x={x} y={y} z={z} increaseValues={increaseValues}/>
		</div >
	);
}

export default ComponentA;
