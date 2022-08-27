import React from 'react';
import ComponentC from './ComponentC';

const ComponentB = (props) => {

	return (
		<div className='task'>
			<h4 className='mb-3'>Component B</h4>
				<ComponentC {...props}/>
		</div >
	);
}

export default ComponentB;
