import React, {useState}  from 'react';
import Plan from './Plan';

import { Container, Row, Col} from 'react-bootstrap';

import './layout.css';

const Layout = () => {

	const [plans, setPlans] = useState(
		[
			{
				name: 'Start',
				price: 'Free',
				users: 1,
				projects: 1
			},
			{
				name: 'Basic',
				price: '$ 19,99',
				users: 5,
				projects: 20
			},
			{
				name: 'Expert',
				price: '$ 129,99',
				users: 'Unlimited',
				projects: 'Unlimited'
			}
		]);

		const orderHandler = (name) => {
			let newPrice;
			if (name === 'Basic') {
				newPrice = getRandomPrice(0, 99);
			} else if (name === 'Expert') {
				newPrice = getRandomPrice(99, 199);
			} else {
				return
			}	

			const indexOfPlan = plans.findIndex(plan => plan.name === name);
			let newPlans = [...plans];
			newPlans.splice(indexOfPlan, 1, {...plans[indexOfPlan], price: `$ ${newPrice},99`})
	
			setPlans([...newPlans]);
			
		}

		const getRandomPrice = (min, max) => {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

	return (
		<Container className='flex-column align-items-center'>
				<h2 as={Row} className='w-100 text-center'>Premium Plans</h2>
			<Row className='d-flex justify-content-center'>
				<Col md={8}>
					<p className='text w-100 text-center text-secondary'>Sample text. Lorem ipsum dolor, sit amet consectetur adipisicing elit nullam nunc justo sagittis suscipit&nbsp;ultrices.</p>
				</Col>
			</Row>
			<Row className='cards-block'>
				{plans.map( plan => (
					<Plan 
						key={plan.name} 
						name={plan.name} 
						price={plan.price}
						users={plan.users}
						projects={plan.projects}
						orderFunc={orderHandler}
					/>))}
			</Row>
		</Container >
	);
}

export default Layout;
