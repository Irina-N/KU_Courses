import React from 'react';
import ComponentB from './ComponentB';

const ComponentA = () => {

	const x = 1;
	const y = 2;
	const z = 3;	

	return (
		<div className='task'>
			<h3>Component A</h3>
				<div>
					<p>x = {x}</p>
					<p>y = {y}</p>
					<p>z = {z}</p>
				</div>
			<ComponentB x={x} y={y} z={z}/>
		</div >
	);
}

export default ComponentA;
