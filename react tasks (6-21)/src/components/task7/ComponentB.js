import React from 'react';

const ComponentB = (props) => {

	return (
		<div className='task'>
			<h4 className='mb-3'>Component B</h4>
				<div>
					<h5>props:</h5>
					{Object.keys(props).map( el => <p key={el}> {el}: {props[el]}</p>)}
				</div>
		</div >
	);
}

export default ComponentB;
