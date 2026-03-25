import { useState } from 'react';
import './App.css';
import { Body } from './components/Body/Body';
import { CardButton } from './components/CardButton/CardButton';
import { Header } from './components/Header/Header';
import { JournalAddButton } from './components/JournalAddButton/JournalAddButton';
import { JournalForm } from './components/JournalForm/JournalForm';
import { JournalItem } from './components/JournalItem/JournalItem';
import { JournalList } from './components/JournalList/JournalList';
import { LeftPanel } from './components/LeftPanel/LeftPanel';

function App() {
	
	const [items, setItems] = useState([
		{
			id: 1,
			title: 'Подготовка к обновлению курсов', 
			date: new Date(),
			text: 'Просто печатаю какой-то текст совсем не о чём'
		}, 
		{
			id: 2,
			title: 'Подготовка к тестированию курсов',
			date: new Date(),
			text: 'Просто печатаю мощный текст совсем не о чём'
		}
	]
	);

	const addItem = (item) => {
		setItems(oldItems => [...oldItems, {
			id: Math.max(...oldItems.map(i => i.id )) + 1,
			title: item.title,
			date: new Date(item.date),
			text: item.text
		}]);
	};

	const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	};

	return (
		<div className='app'>
			<LeftPanel>
				<Header/>
				<JournalAddButton/>
				<JournalList>
					{items.sort(sortItems).map(el => (
						<CardButton key={el.id}>
							<JournalItem
								title={el.title}
								date={el.date}
								text={el.text}
							/>
						</CardButton>
					))}
				</JournalList>
			</LeftPanel>
			<Body>
				<JournalForm
					onSubmit={addItem} 
				/>
			</Body>
		</div>
	);
}

export default App;
