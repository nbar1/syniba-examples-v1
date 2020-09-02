import React from 'react';
import { cleanup, fireEvent, waitForElement } from '@testing-library/react';
import renderWithRoute from 'test-utils/renderWithRoute';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Account from '.';

afterEach(cleanup);

it('renders', () => {
	renderWithRoute(<Account />);
});

it('opens change password modal', async () => {
	const { getByText, findByTestId, queryByTestId } = renderWithRoute(<Account />);

	fireEvent.click(getByText('Update Password'));

	await waitForElement(() => queryByTestId('Modal'));

	expect(queryByTestId('Modal')).toBeInTheDocument();
});

it('closes change password modal', async () => {
	const { getByText, queryByTestId, getByTestId } = renderWithRoute(<Account />);

	fireEvent.click(getByText('Update Password'));

	await waitForElement(() => queryByTestId('Modal'));

	expect(queryByTestId('Modal')).toBeInTheDocument();

	fireEvent.click(getByTestId('Modal-CloseButton'));

	expect(queryByTestId('Modal')).toBeNull();
});

it('shows banner on successful password change', async () => {
	var mock = new MockAdapter(axios, { delayResponse: 500 });
	mock.onPost('/api/v1/account/update-password').reply(200);

	const { getByText, queryByTestId, getAllByTestId } = renderWithRoute(<Account />);

	fireEvent.click(getByText('Update Password'));

	await waitForElement(() => queryByTestId('Modal'));

	expect(queryByTestId('Modal')).toBeInTheDocument();

	fireEvent.change(getAllByTestId('Input')[0], { target: { value: 'password' } });
	fireEvent.change(getAllByTestId('Input')[1], { target: { value: 'password' } });
	fireEvent.change(getAllByTestId('Input')[2], { target: { value: 'password' } });

	fireEvent.click(queryByTestId('UpdatePassword-ActionButton'));

	await waitForElement(() => queryByTestId('Banner'));

	expect(queryByTestId('Banner')).toBeInTheDocument();

	expect(queryByTestId('Banner')).toHaveTextContent(/Your password has been updated/i);

	fireEvent.click(queryByTestId('Banner-CloseButton'));

	expect(queryByTestId('Banner')).toBeNull();
});
