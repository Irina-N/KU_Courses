import React, { useState } from 'react';

import { Form, InputGroup, Button } from 'react-bootstrap/';

const Task21 = () => {

	const [messsages, setMesssages] = useState([]);
	const [msgText, setMsgText] = useState('');

	const styles = {
		block: {
			position: 'relative',			
			height: '350px',
			maxWidth: '600px',
			margin: '0 auto'

		},
		msgField: {
			position: 'absolute',
			border: '1px solid #ced4da',
			borderRadius: '5px',
			top: 0,
			left: 0,
			right: 0,
			bottom: '50px',
			padding: '10px',
			overflowY: 'scroll',
		},
		inpitGroup: {
			position: 'absolute',
			width: '100%',
			left: 0,
			right: 0,
			bottom: '1px',
			margin: 0,
		}
	}

	const getMsgId = () => {
		return messsages.length ? messsages.reduce(((acc, current) => acc.id > current.id ? acc : current), 0).id + 1 : 0;
	}

	const getDate = () => {
		const now = new Date();

		const addZero = (num) => {
			return num < 10 ? `0${num}` : num;
		}

		const month = addZero(now.getMonth() + 1);
		const date = addZero(now.getDate() + 1);
		const hours = addZero(now.getHours());
		const min = addZero(now.getMinutes());

		return `${now.getFullYear()}-${month}-${date} ${hours}:${min}`
	}

	const sendMsgHandler = () => {
		
		if (msgText.trim() !== '') {
			setMesssages(
				[...messsages, {
					id: getMsgId(), 
					text: msgText,
					date: getDate()
				}]
			);
			setMsgText('');
		}
	}

	return (
		<div id='task21' className='task '>
			<h1 className='task-header'>Task 21</h1>
			<div style={styles.block}>
				<div style={styles.msgField}>

					{
					messsages.length > 0 && 
					messsages.map (msg => <Message key={msg.id} text={msg.text} date={msg.date}/>)}

				</div>
				<InputGroup className='mb-0' style={styles.inpitGroup}>
					<Form.Control
						placeholder='Enter message'
						value={msgText}
						onChange={e => setMsgText(e.target.value)}
						onKeyDown={e => {if (e.key === 'Enter') {sendMsgHandler()}}}
					/>
					<Button variant='outline-secondary' onClick={sendMsgHandler}>
						Send
					</Button>
				</InputGroup>
			</div>

		</div >
	);
}

const Message = ({ text, date }) => {
	
	const styles = {
		msg: {
			width: 'fit-content',
			maxWidth: '90%',
			padding: '8px 17px',
			marginBottom: '10px',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			gap: '8px',
			backgroundColor: 'lightgreen',
			borderRadius: '15px'
		},
		text: {
			fontSize: '18px',
			paddingRight: '10px',
			margin: '0 auto 0 0',
			overflowWrap: 'anywhere'
		},
		date: {
			fontSize: '12px',
			margin: '0 0 0 auto',
			paddingLeft: '45px',
			color: '#6c757d'
		}
	}	

	return (
		<div style={styles.msg}>
			<p style={styles.text}>{text}</p> <p style={styles.date}>{date}</p>
		</div >
	);
}

export default Task21;
