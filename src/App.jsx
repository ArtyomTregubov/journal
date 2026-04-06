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

	const addItem = item => {
		setItems([...mapItems(items), {
			id: items.length > 0 ? Math.max(...items.map(i => i.id )) + 1 : 1,
			title: item.title,
			date: new Date(item.date),
			post: item.post
		}]);
	};

	return (
		<UserContextProvider>
			<div className='app'>
				<LeftPanel>
					<SelectUser/>
					<Header/>
					<JournalAddButton/>
					<JournalList items={mapItems(items)} />
				</LeftPanel>
				<Body>
					<JournalForm
						onSubmit={addItem} 
					/>
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;
