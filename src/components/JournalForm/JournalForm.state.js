export const INITIAL_STATE = {
	isValid: {
		title: true,
		date: true,
		post: true
	},
	values: {
		title: undefined,
		date: undefined,
		post: undefined
	},
	isFormRedyToSubmit: false
};

export const formReducer = (state, action) => {
	switch(action.type) {
	case 'RESET_VALIDITY': return {...state, isValid: INITIAL_STATE.isValid};
	}
};