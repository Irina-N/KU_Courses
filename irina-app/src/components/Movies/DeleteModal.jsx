import React from 'react';
import { Button, Modal, CloseButton } from 'react-bootstrap/';

export const DeleteModal = ({ isShown, onHide, deleteItems, itemsToBeRemoved }) => {
	
	const titles = itemsToBeRemoved.map((item, i) => `"${item?.title}"`);

	return ( 
		<>
		{itemsToBeRemoved.length > 0 && (
			<Modal
				show={isShown}
				size='lg'
				aria-labelledby='delete-modal'
				centered
			>
				<Modal.Header>
					<Modal.Title id='delete-modal'>
						<strong>Delete Movie</strong>
					</Modal.Title>
					<CloseButton onClick={onHide}/>
				</Modal.Header>
				<Modal.Body>
					<h5>Are you sure you want to delete <strong >{titles.join(', ')}</strong>?</h5>
					<p className='text-warning'>This action cannot be undone.</p>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='success' 
						onClick={onHide}
					>
						Cancel
					</Button>
					<Button
						variant='danger'
						onClick={() => deleteItems(itemsToBeRemoved)}
					>
						Yes, delete
					</Button>
				</Modal.Footer>
			</Modal>
		)} </>
	);
};

export default DeleteModal;
