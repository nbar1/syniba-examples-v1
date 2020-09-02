import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const AuthenticationContext = React.createContext({});

export const Provider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('SEA-isAuthenticated') === 'true');

	const login = () => {
		localStorage.setItem('SEA-isAuthenticated', true);
		setIsAuthenticated(true);
	};

	const logout = async () => {
		localStorage.setItem('SEA-isAuthenticated', false);

		await axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`);

		setIsAuthenticated(false);
	};

	const authenticationContext = {
		login,
		logout,
		isAuthenticated,
	};

	return <AuthenticationContext.Provider value={authenticationContext}>{children}</AuthenticationContext.Provider>;
};

Provider.propTypes = {
	children: PropTypes.any,
};

export const { Consumer } = AuthenticationContext;
