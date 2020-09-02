const login = () => {
	localStorage.setItem('isAuthenticated', true);
};

const logout = () => {
	localStorage.setItem('isAuthenticated', false);
};

const isAuthenticated = () => {
	return localStorage.getItem('isAuthenticated') === 'true';
};

export { login, logout, isAuthenticated };
