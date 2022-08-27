import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Task20 = () => {

	const checkbox = ['dog', 'cat', 'chicken', 'cow', 'sheep', 'horse'];
	const radio = ['to be', 'not to be'];
	const options = ['winter', 'spring', 'summer', 'autumn'];

	const [formData, setFormData] = useState({
		text: '',
		animals: [],
		choice: null,
		season: options[0],
	});

	const onChangeHandler = (e) => {

		const { name, value, type, checked } = e.target;

		if (type === 'checkbox') {
			const updatedAnimals = checked ? [...formData.animals, value] : [...formData.animals].filter(animal => animal !== value);
			setFormData({ ...formData, [name]: [...updatedAnimals] });
		} else {
			setFormData({ ...formData, [name]: value });
		}
	}

	const onSubmitHandler = () => {
		console.table(formData);
	}

	return (
		<div id='task20' className='task '>
			<h1 className='task-header'>Task 20</h1>
			<Form>
				<Form.Control
					className='mb-2'
					name='text'
					type='text'
					placeholder='Write something'
					value={formData.text}
					onChange={(e) => { onChangeHandler(e) }}
				/>

				<Form.Control
					as='select'
					name='season'
					className='mb-4'
					onChange={(e) => { onChangeHandler(e) }}
				>
					{options.map(option => <option value={option} key={option}>{option.slice(0, 1).toUpperCase() + option.slice(1)}</option>)}
				</Form.Control>

				<div className='mb-3'> {checkbox.map((el, i) => <Form.Check key={i} name='animals' label={el} value={el} inline type='checkbox' onChange={(e) => { onChangeHandler(e) }} />)} </div>

				<div className='mb-3'> {radio.map((el, i) => <Form.Check key={i} name='choice' label={el} value={el} inline type='radio' onChange={(e) => { onChangeHandler(e) }} />)} </div>

				<Button
					variant='outline-secondary'
					id='button-addon2'
					onClick={onSubmitHandler}
				>
					Confirm
				</Button>
			</Form>

		</div >
	);
}

export default Task20;
