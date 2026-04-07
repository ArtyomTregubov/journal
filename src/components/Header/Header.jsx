import { useState } from 'react';
import { Button } from '../Button/Button';
import styles from './Header.module.css';
import { SelectUser } from '../SelectUser/SelectUser';

const logos = ['/react.svg', '/vite.svg  '];

export const Header = () => {
	const [indexLogo, setIndexLogo] = useState(0);
	const toggleIndex = () => {
		setIndexLogo(state => Number(!state));
	};

	return (
		<>
			<span className={styles.logo}> Personal Journal</span>
			<img src={logos[indexLogo]} alt='картинка'/>
			<SelectUser />
			<Button onClick={toggleIndex}/> 
		</>
	);
};

