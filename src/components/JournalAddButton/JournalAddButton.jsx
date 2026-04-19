import { CardButton } from '../CardButton/CardButton';
import './JournalAddButton.css';

export const JournalAddButton = ({ clearForm }) => {
	return (
		<CardButton className='journal-add' onClick={clearForm}>
			<span>+ </span>
            Новое воспоминание
		</CardButton>
	);
};

