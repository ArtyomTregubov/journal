/* eslint-disable react-hooks/set-state-in-effect */
import { useState } from 'react';
import { useEffect } from 'react';

export function useLockalStoradge (key) {
	const [data, setData] = useState([]);

	useEffect(() => {
		const res = JSON.parse(localStorage.getItem(key));
		if (res) {
			setData(res);
		}
	}, [key]);

	const saveData = (newData) => {
		localStorage.setItem(key, JSON.stringify(newData));
		setData(newData);
	};

	return [data, saveData];
}