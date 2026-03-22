import { Button } from './components/Button/Button';
import { CardButton } from './components/CardButton/CardButton';
import { JournalItem } from './components/JournalItem/JournalItem';

function App() {
  const data = [
    {
      title: 'Подготовка к обновлению курсов',
      date: new Date(),
      text: 'Просто печатаю какой-то текст совсем не о чём'
    }, 
    {
      title: 'Подготовка к тестированию курсов',
      date: new Date(),
      text: 'Просто печатаю мощный текст совсем не о чём'
    }
  ];

  return (
    <>
      <h1>Заголовок</h1>
      <p>Какой-то компонент</p>
      <Button />
      <CardButton>
        <JournalItem
          title={data[0].title}
          date={data[0].date}
          text={data[0].text}
        />
      </CardButton>
      <CardButton>
        <JournalItem
          itle={data[1].title}
          date={data[1].date}
          text={data[1].text}
        />
      </CardButton>
    </>
  );
}

export default App;
