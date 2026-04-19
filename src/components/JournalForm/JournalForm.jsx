import { useContext, useEffect, useReducer, useRef } from 'react';
import { Button } from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';

export const JournalForm = ({onSubmit, data, onDelete}) => {
	
	const [formState, formDispatch] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormRedyToSubmit, values } = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const postRef = useRef();
	const {userId} = useContext(UserContext);

	useEffect(() => {
		if (!data) {
			formDispatch({type: 'CLEAR'});
			formDispatch({type: 'SET_VALUE', payload: {userId}});
		}
		
		formDispatch({type: 'SET_VALUE', payload: {...data}});
	}, [data]);

	const onChange = (e) => {
		formDispatch({type: 'SET_VALUE', payload: {[e.target.name]: e.target.value}});
	};

	useEffect(() => {
		let timerId;
		if(!isValid.title || !isValid.date || !isValid.post) {
			focusError(isValid);
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
			formDispatch({type: 'SET_VALUE', payload: {userId}});
		}
	}, [isFormRedyToSubmit, values, onSubmit, userId]);

	useEffect(() => {
		formDispatch({type: 'SET_VALUE', payload: {userId}});
	}, [userId]);

	const addJournalItem = (e) => {
		e.preventDefault();
		formDispatch({type: 'SUBMIT'});
	};

	const deleteJournalItem = () => {
		onDelete(data.id);
		formDispatch({type: 'CLEAR'});
		formDispatch({type: 'SET_VALUE', payload: {userId}});
	};

	const focusError = (isValid) => {
		switch(true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date: 
			dateRef.current.focus();
			break;
		case !isValid.post:
			postRef.current.focus();
			break;		
		}
	};

	return (

		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={styles['form-row']}>
				<Input 
					type='text' 
					name='title' 
					value={values.title} 
					ref={titleRef}
					onChange={onChange} 
					apperance='title'
					isValid={isValid.title}
				/>
				{ data?.id && <button className={styles['delete-button']} type='button'onClick={deleteJournalItem}></button>}
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='date' className={styles['form-lable']}> 
					<img src='/calendar.png' alt='иконка календаря' className={styles['lable-icon']} />
					<span>Дата</span>
				</label>
				<Input 
					type='date' 
					name='date' 
					value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''} 
					ref={dateRef}
					onChange={onChange} 
					id='date' 
					isValid={isValid.date}
				/>   
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='tag' className={styles['form-lable']}> 
					<img src='/folder.png' alt='иконка папки' className={styles['lable-icon']} />
					<span>Метки</span>
				</label>
				<Input 
					type='text'  
					name='tag' 
					id='tag' 
					value={values.tag} 
					onChange={onChange} 
				/>
			</div>
			<textarea 
				value={values.post} 
				ref={postRef}
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

