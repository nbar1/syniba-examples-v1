import React from 'react';
import { fireEvent, cleanup, waitForElement, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRoute from '../../test-utils/renderWithRoute';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Form from './Form';

afterEach(cleanup);

beforeEach(() => {
	var mock = new MockAdapter(axios, { delayResponse: 500 });
	mock.onPost('/api/v1/auth/login').reply(200);
});

afterEach(cleanup);

it('renders', () => {
	renderWithRoute(<Form />);
});

it('logs in', () => {
	const { getByTestId } = renderWithRoute(<Form />);

	fireEvent.click(getByTestId('Form-submit'));
});

it('logs in with expired error', () => {
	var mock = new MockAdapter(axios, { delayResponse: 500 });
	mock.onPost('/api/v1/auth/login').reply(401, { metadata: { type: 'expired', resetToken: 'valid-token' } });

	const { getByTestId } = renderWithRoute(<Form />);

	fireEvent.click(getByTestId('Form-submit'));

	// TODO this seems broken, popup doesn't show up
});

it('sets username and password', () => {
	const { getByTestId } = renderWithRoute(<Form />);

	fireEvent.change(getByTestId('Form-username'), { target: { value: 'username' } });
	fireEvent.change(getByTestId('Form-password'), { target: { value: 'password' } });

	expect(getByTestId('Form-username').value).toEqual('username');
	expect(getByTestId('Form-password').value).toEqual('password');
});

it('sets remember me', () => {
	const { getByTestId } = renderWithRoute(<Form />);

	fireEvent.click(getByTestId('Form-RememberMe'));
});

it('logs in with remember me', () => {
	const { getByTestId } = renderWithRoute(<Form />);

	fireEvent.click(getByTestId('Form-RememberMe'));

	fireEvent.click(getByTestId('Form-submit'));
});

it('opens forgot password', async () => {
	const { queryByTestId, getByTestId } = renderWithRoute(<Form />);

	fireEvent.click(getByTestId('Form-ForgotPasswordLink'));

	await waitForElement(() => queryByTestId('Modal'));

	expect(queryByTestId('Modal')).toBeInTheDocument();
});

it('closes forgot password', async () => {
	const { queryByTestId, getByTestId } = renderWithRoute(<Form />);

	fireEvent.click(getByTestId('Form-ForgotPasswordLink'));

	await waitForElement(() => queryByTestId('Modal'));

	expect(queryByTestId('Modal')).toBeInTheDocument();

	fireEvent.click(getByTestId('Modal-CloseButton'));

	expect(queryByTestId('Modal')).toBeNull();
});

it('requests forgot password with valid email', async () => {
	var mock = new MockAdapter(axios, { delayResponse: 500 });
	mock.onPost('/api/v1/account/forgot-password').reply(200, { data: { message: 'success' } });

	const { queryByTestId, getByTestId, getByText } = renderWithRoute(<Form />);

	fireEvent.click(getByTestId('Form-ForgotPasswordLink'));

	await waitForElement(() => queryByTestId('Modal'));

	expect(queryByTestId('Modal')).toBeInTheDocument();

	fireEvent.change(getByTestId('Input'), { target: { value: 'test@syniba.com' } });

	fireEvent.click(getByText('Recover Account'));
});

it('requests forgot password with invalid response', async () => {
	var mock = new MockAdapter(axios, { delayResponse: 500 });
	mock.onPost('/api/v1/account/forgot-password').reply(429, { data: { message: 'error' } });

	const { queryByTestId, getByTestId, getByText } = renderWithRoute(<Form />);

	fireEvent.click(getByTestId('Form-ForgotPasswordLink'));

	await waitForElement(() => queryByTestId('Modal'));

	expect(queryByTestId('Modal')).toBeInTheDocument();

	fireEvent.change(getByTestId('Input'), { target: { value: 'test@syniba.com' } });

	fireEvent.click(getByText('Recover Account'));
});

it('requests forgot password with invalid email', async () => {
	const { queryByTestId, getByTestId, getByText } = renderWithRoute(<Form />);

	fireEvent.click(getByTestId('Form-ForgotPasswordLink'));

	await waitForElement(() => queryByTestId('Modal'));

	expect(queryByTestId('Modal')).toBeInTheDocument();

	fireEvent.change(getByTestId('Input'), { target: { value: '' } });

	fireEvent.click(getByText('Recover Account'));

	fireEvent.change(getByTestId('Input'), { target: { value: 'not-a-valid-email' } });

	fireEvent.click(getByText('Recover Account'));
});
