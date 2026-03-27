import { useState } from 'react';
import { Button } from '../Button/Button';
import './JournalForm.css';

export const JournalForm = ({onSubmit}) => {
	const [formValideState, setFormValideState] = useState({
		title: true,
		date: true,
		post: true
	});

	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		let isFormValid = true;

		if (!formProps.title.trim().length) {
			setFormValideState(state => ({...state, title: false}));
			isFormValid = false;
		} else {
			setFormValideState(state => ({...state, title: true}));
		}

		if (!formProps.date) {
			setFormValideState(state => ({...state, date: false}));
			isFormValid = false;
		} else {
			setFormValideState(state => ({...state, date: true}));
		}

		if (!formProps.post.trim().length) {
			setFormValideState(state => ({...state, post: false}));
			isFormValid = false;
		} else {
			setFormValideState(state => ({...state, post: true}));
		}

		if (!isFormValid) {
			return;
		}

		onSubmit(formProps);
	};

	return (
		<form className='journal-form' onSubmit={addJournalItem}>
			<input type='text' name='title' className={`input ${formValideState.title ? ' ' : 'invalid'}`} />
			<input type='date' name='date' className={`input ${formValideState.date ? ' ' : 'invalid'}`} />
			<input type='text' name='tag' />
			<textarea 
				name='post' 
				id='' 
				className={`input ${formValideState.post ? ' ' : 'invalid'}`}
				cols='30' 
				rows='10'
			>
			</textarea>
			<Button text={'Сохранить'} />
		</form>
	);
};

