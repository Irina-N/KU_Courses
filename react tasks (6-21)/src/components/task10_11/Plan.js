import React from 'react';

import { Col, Button} from 'react-bootstrap';

const Plan = ({name, price, users, projects, orderFunc}) => {

	return (
		<Col xs={3} className='d-flex flex-column align-items-center justify-content-center plan-card'>
			<h2>{name}</h2>
			<h4>{price}</h4>
			<p className='card-text text-dark'>{users} User</p>
			<p className='card-text text-dark'>{projects} Project</p>
			<Button className='btn-order' onClick={() => orderFunc(name)}>Order Now</Button>
		</Col>
	);
}

export default Plan;
