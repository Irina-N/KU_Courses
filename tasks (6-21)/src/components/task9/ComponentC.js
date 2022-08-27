import React from 'react';

import { Button } from 'react-bootstrap';

const ComponentC = ({x, y, z, increaseValues}) => {

	return (
		<div className='task'>
			<h4 className='mb-3'>Component C</h4>
				<div>
					<h5>props:</h5>
						<p>x = {x}</p>
						<p>y = {y}</p>
						<p>z = {z}</p>
						<Button onClick={increaseValues}>Increase values</Button>
				</div>
		</div >
	);
}

export default ComponentC;
