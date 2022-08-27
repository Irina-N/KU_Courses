import React, { useState } from 'react';

import { Alert, Button } from 'react-bootstrap';


const Task14 = () => {

	const Notifications = {
		Success: 'success',
		Danger: 'danger',
		Warning: 'warning',
		Info: 'info'
	};

	const [systemNotif, setSystemNotif] = useState('danger');

	return (
		<div id='task14' className='task d-flex flex-column align-items-center'>
			<h1 className='task-header'>Task 14</h1>
			<div className='d-flex pb-3'>
				{Object.keys(Notifications).map(variant => (
					<Button
						key={variant}
						variant={Notifications[variant]}
						onClick={e => setSystemNotif(Notifications[variant])}
						style={{ width: '80px', margin: '0 5px' }}
					>
						{variant}
					</Button>))
				}
			</div>
			<Alert variant={systemNotif} style={{ width: '350px'}}>
				This is a <strong>{systemNotif}</strong> alert—check it out!
			</Alert>

		</div >
	);
}

export default Task14;
