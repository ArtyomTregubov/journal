import { useEffect, useReducer } from 'react';
import { Button } from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from './JournalForm.state';

export const JournalForm = ({onSubmit}) => {
	const [formState, formDispatch] = useReducer(formReducer, INITIAL_STATE);
	const { isValid } = formState;

	useEffect(() => {
		let timerId;
		if(!isValid.title || !isValid.date || !isValid.post) {
			timerId = setTimeout(() => {
				formDispatch({type: 'RESET_VALIDITY'});
			}, 2000);
		}

		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

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
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<input type='text' name='title' className={cn(styles['input-title'], {
					[styles['invalid']]: !formValideState.title
				})} />
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='date' className={styles['form-lable']}> 
					<img src='../../../public/calendar.png' alt='иконка календаря' className={styles['lable-icon']} />
					<span>Дата</span>
				</label>
				<input type='date' name='date' id='date' className={cn(styles['input'], {
					[styles['invalid']]: !formValideState.date
				})} />   
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='tag' className={styles['form-lable']}> 
					<img src='../../../public/folder.png' alt='иконка папки' className={styles['lable-icon']} />
					<span>Метки</span>
				</label>
				<input type='text' name='tag' id='tag' className={cn(styles['input'], {
					[styles['invalid']]: !formValideState.date
				})} />
			</div>
			<textarea 
				name='post' 
				id='post' 
				className={cn(styles['input'], {
					[styles['invalid']]: !formValideState.post
				})}
				cols='30' 
				rows='10'
			>
			</textarea>
			<Button text={'Сохранить'} />
		</form>
	);
};

