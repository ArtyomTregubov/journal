import { CardButton } from '../CardButton/CardButton';
import './JournalAddButton.css';

export const JournalAddButton = () => {
	return (
		<CardButton className='journal-add'>
			<span>+ </span>
            Новое воспоминание
		</CardButton>
	);
};

