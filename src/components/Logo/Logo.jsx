import { memo } from 'react';
import styles from './Logo.module.css';

const Logo = () => {
	return <span className={styles.logo}> Personal Journal</span>;
};

export default memo(Logo);
