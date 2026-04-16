import { useCallback, useState } from 'react';
import { Button } from '../Button/Button';
import styles from './Header.module.css';
import { SelectUser } from '../SelectUser/SelectUser';
import Logo from '../Logo/Logo';

const logos = ['/react.svg', '/vite.svg  '];

export const Header = () => {
	const [indexLogo, setIndexLogo] = useState(0);
	const toggleIndex = useCallback(() => {
		setIndexLogo(state => Number(!state));
	}, []);

	return (
		<>
			<span className={styles.logo}> Personal Journal</span>
			<Logo image={logos[indexLogo]}/>
			<SelectUser />
			<Button onClick={toggleIndex}/> 
		</>
	);
};

