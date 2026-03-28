import { useEffect, useState } from 'react';
import './App.css';
import { Body } from './components/Body/Body';
import { Header } from './components/Header/Header';
import { JournalAddButton } from './components/JournalAddButton/JournalAddButton';
import { JournalForm } from './components/JournalForm/JournalForm';
import { JournalList } from './components/JournalList/JournalList';
import { LeftPanel } from './components/LeftPanel/LeftPanel';

function App() {
	
	const [items, setItems] = useState([]);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('data'));
		if (data) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setItems(data.map(item => ({
				...item,
				date: new Date(item.date)
			})));
		}
	}, []);

	useEffect(() => {
		if(items.length) {
			localStorage.setItem('data',
				JSON.stringify(items)
			);
		}
	}, [items]);

	const addItem = (item) => {
		setItems(oldItems => [...oldItems, {
			id: oldItems.length > 0 ? Math.max(...oldItems.map(i => i.id )) + 1 : 1,
			title: item.title,
			date: new Date(item.date),
			post: item.post
		}]);
	};

	return (
		<div className='app'>
			<LeftPanel>
				<Header/>
				<JournalAddButton/>
				<JournalList items={items} />
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
