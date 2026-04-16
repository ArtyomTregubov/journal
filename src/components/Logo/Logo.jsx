import { memo } from 'react';

const Logo = ({image}) => {
	return <img src={image} alt='артинка'/>;
};

export default memo(Logo);
