import { useEffect, useReducer } from 'react';
import { Button } from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from './JournalForm.state';

export const JournalForm = ({onSubmit}) => {
	
	const [formState, formDispatch] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormRedyToSubmit, values } = formState;

	const onChange = (e) => {
		formDispatch({type: 'SET_VALUE', payload: {[e.target.name]: e.target.value}});
	};

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

	useEffect(() => {
		if(isFormRedyToSubmit) {
			onSubmit(values);
			formDispatch({type: 'CLEAR'});
		}
	}, [isFormRedyToSubmit]);

	const addJournalItem = (e) => {
		e.preventDefault();
		formDispatch({type: 'SUBMIT'});

	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<input type='text' name='title' value={values.title} onChange={onChange} className={cn(styles['input-title'], {
					[styles['invalid']]: !isValid.title
				})} />
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='date' className={styles['form-lable']}> 
					<img src='../../../public/calendar.png' alt='иконка календаря' className={styles['lable-icon']} />
					<span>Дата</span>
				</label>
				<input type='date' name='date' value={values.date} onChange={onChange} id='date' className={cn(styles['input'], {
					[styles['invalid']]: !isValid.date
				})} />   
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='tag' className={styles['form-lable']}> 
					<img src='../../../public/folder.png' alt='иконка папки' className={styles['lable-icon']} />
					<span>Метки</span>
				</label>
				<input type='text' name='tag' id='tag' value={values.tag} onChange={onChange} className={cn(styles['input'], {
					[styles['invalid']]: !isValid.date
				})} />
			</div>
			<textarea 
				value={values.post} 
				onChange={onChange}
				name='post' 
				id='post' 
				className={cn(styles['input'], {
					[styles['invalid']]: !isValid.post
				})}
				cols='30' 
				rows='10'
			>
			</textarea>
			<Button text={'Сохранить'} />
		</form>
	);
};

