import React, { useState } from 'react';

import { Card, Button } from 'react-bootstrap';


const Task12 = () => {

	const [user, setUser] = useState({
		'userId': 1,
		'username': 'Bob',
		'city': 'New York, USA',
		'position': 'Senior Software Engineer at Technext Limited',
		'status': 'online',
		'profileImg': 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-File.png'
	});

	const styles = {
		card: {
			padding: '20px 10px', 
			marginBottom: '15px', 
			boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)'
		},
		img: {
			width: '120px',
			hight: '120px',
		},
		icon: {
			display: 'inline-block',
			textAlign: 'center',
			lineHeight: '22px',
			width: '22px',
			height: '22px',
			borderRadius: '50%',
			backgroundColor: user.status === 'online' ? '#1ec81e' : '#ff3c00',
			color: '#fff'
		}
	};

	const onClickHandler = (status) => {
		setUser({...user, status: status})
	};


	return (
		<div id='task12' className='task d-flex flex-column align-items-center'>
			<h1 className='task-header'>Task 12</h1>
			<Card style={styles.card}>
				<Card.Img variant='top' src={user.profileImg} style={styles.img}/>
				<Card.Body>
					<Card.Title>{user.username} <i className='small material-icons' style={styles.icon}>check</i> </Card.Title>
					<Card.Text className='text-dark'>{user.position}</Card.Text>
					<Card.Text className='text-secondary'>{user.city}</Card.Text>
				</Card.Body>
				<Card.Body className='pt-0 pb-0'>
					<Button variant='link' name='online' onClick={e => onClickHandler(e.target.name)} disabled={user.status === 'online'}>Online</Button>
					<Button variant='link' name='offline' onClick={e => onClickHandler(e.target.name)} disabled={user.status === 'offline'}>Offline</Button>
				</Card.Body>
			</Card>
		</div >
	);
}

export default Task12;
