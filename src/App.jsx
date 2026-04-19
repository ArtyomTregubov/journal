import './App.css';
import { Body } from './components/Body/Body';
import { Header } from './components/Header/Header';
import { SelectUser } from './components/SelectUser/SelectUser';
import { JournalAddButton } from './components/JournalAddButton/JournalAddButton';
import { JournalForm } from './components/JournalForm/JournalForm';
import { JournalList } from './components/JournalList/JournalList';
import { LeftPanel } from './components/LeftPanel/LeftPanel';
import { UserContextProvider } from './context/user.context';
import { useLockalStoradge } from './hooks/use-lockalStoradge.hook';
import { useState } from 'react';

function mapItems(items) {
	if (!items) {
		return [];
	}
	return items.map(i => ({
		...i,
		date: new Date(i.date)
	}));
}

function App() {
	
	const [items, setItems] = useLockalStoradge('data');
	const [selectedItem, setSelectedItem] = useState(null);

	const addItem = item => {
		if (!item.id) {
			setItems([...mapItems(items), {
				...item,
				id: items.length > 0 ? Math.max(...items.map(i => i.id )) + 1 : 1,
				date: new Date(item.date)
			}]);
		} else {
			setItems([...mapItems(items).map(i => {
				if(i.id === item.id) {
					return {
						...item
					};
				}
				return i;
			})]);
		}
		
	};

	const deleteItem = (id) => {
		setItems([...items.filter(i => i.id !== id)]);
	};

	return (
		<UserContextProvider>
			<div className='app'>
				<LeftPanel>
					<Header/>
					<JournalAddButton clearForm={() => setSelectedItem(null)}/>
					<JournalList 
						items={mapItems(items)} 
						setItem={setSelectedItem}/>
				</LeftPanel>
				<Body>
					<JournalForm
						onSubmit={addItem}
						data={selectedItem}
						onDelete={deleteItem}
					/>
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;
