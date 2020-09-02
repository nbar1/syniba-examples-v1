import React, { useState, useContext } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import initializeFontAwesome from './helpers/fontAwesome';

import { defaultTheme } from './themes';

import Page from './components/Page';
import Login from './components/Login';
import { AuthenticationContext } from './AuthenticationContext';

initializeFontAwesome();

const AppWrapper = styled.div`
	box-sizing: border-box;
	height: 100%;
`;

const GlobalStyle = createGlobalStyle`
	html {
		overflow-x: hidden;
	}

	html,
	body {
		background: ${props => props.theme.backgroundColor};
		font-family: Arial, Helvetica, sans-serif;
		margin: 0;
		min-height: 100%;
		padding: 0;
	}
`;

const App = () => {
	const [theme, setTheme] = useState(defaultTheme);
	const { isAuthenticated } = useContext(AuthenticationContext);

	return (
		<HelmetProvider>
			<ThemeProvider theme={theme}>
				<AppWrapper>
					<Helmet>
						<title>{theme.title}</title>
					</Helmet>
					{isAuthenticated && <Page setTheme={setTheme} />}
					{!isAuthenticated && <Login />}
					<GlobalStyle />
				</AppWrapper>
			</ThemeProvider>
		</HelmetProvider>
	);
};

export default App;
