import React from 'react';

const ComponentC = ({x, y, z}) => {

	return (
		<div className='task'>
			<h4 className='mb-3'>Component C</h4>
				<div>
					<h5>props:</h5>
						<p>x = {x}</p>
						<p>y = {y}</p>
						<p>z = {z}</p>
				</div>
		</div >
	);
}

export default ComponentC;
