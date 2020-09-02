import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as AuthenticationProvider } from './AuthenticationContext';
import App from './App';

ReactDOM.render(
	<BrowserRouter>
		<AuthenticationProvider>
			<App />
		</AuthenticationProvider>
	</BrowserRouter>,
	document.getElementById('root')
);
