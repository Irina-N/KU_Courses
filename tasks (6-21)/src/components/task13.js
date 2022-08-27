import React from 'react';

import Card from 'react-bootstrap/Card';


const Task13 = () => {

	const users = [{
		'userId': 1,
		'username': 'Bob',
		'status': 'offline',
		'profileImg': 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Cutout.png'
	},
	{
		'userId': 2,
		'username': 'Alice',
		'status': 'online',
		'profileImg': 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Photos.png'
	},
	{
		'userId': 3,
		'username': 'Mark',
		'status': 'online',
		'profileImg': 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png'
	},
	{
		'userId': 4,
		'username': 'John',
		'status': 'offline',
		'profileImg': 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-No-Background.png'
	}];

	const styles = {
		block: {
			display: 'flex',
			gap: '8px'
		},
		card: {
			padding: '10px',
			marginBottom: '15px',
		},
		img: {
			width: '120px',
			hight: '120px',
		}
	};

	return (
		<div id='task13' className='task d-flex flex-column align-items-center'>
			<h1 className='task-header'>Task 13</h1>
			<h5>Users online</h5>
			<div style={styles.block}>
				{users.filter(user => { return user.status === 'online' }).map(user => (
					<Card key={user.userId} style={styles.card}>
						<Card.Img variant='top' src={user.profileImg} style={styles.img} />
						<Card.Body>
							<Card.Title>{user.username}</Card.Title>
						</Card.Body>
					</Card>
				))}
			</div>
		</div >
	);
}

export default Task13;
