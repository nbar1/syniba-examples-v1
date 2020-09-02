import React from 'react';
import { cleanup, fireEvent, waitForElement } from '@testing-library/react';
import renderWithRoute from 'test-utils/renderWithRoute';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import UpdatePassword from './UpdatePassword';

afterEach(cleanup);

it('renders', () => {
	renderWithRoute(<UpdatePassword onClose={() => null} onSuccess={() => null} />);
});

it('errors when new passwords do not match', () => {
	const { getAllByTestId, queryByTestId } = renderWithRoute(
		<UpdatePassword onClose={() => null} onSuccess={() => null} />
	);

	fireEvent.change(getAllByTestId('Input')[0], { target: { value: 'password' } });
	fireEvent.change(getAllByTestId('Input')[1], { target: { value: 'password-new' } });
	fireEvent.change(getAllByTestId('Input')[2], { target: { value: 'password-nomatch' } });

	fireEvent.click(queryByTestId('UpdatePassword-ActionButton'));

	expect(queryByTestId('UpdatePassword-ErrorMessage')).toHaveTextContent(/Your passwords must match to continue/i);
});

it('errors when new password is not at least 8 characters', () => {
	const { getAllByTestId, queryByTestId } = renderWithRoute(
		<UpdatePassword onClose={() => null} onSuccess={() => null} />
	);

	fireEvent.change(getAllByTestId('Input')[0], { target: { value: 'password' } });
	fireEvent.change(getAllByTestId('Input')[1], { target: { value: 'short' } });
	fireEvent.change(getAllByTestId('Input')[2], { target: { value: 'short' } });

	fireEvent.click(queryByTestId('UpdatePassword-ActionButton'));

	expect(queryByTestId('UpdatePassword-ErrorMessage')).toHaveTextContent(
		/Your password must be at least 8 characters long/i
	);
});

it("displays correctly when password reset token is given (doesn't require original password)", () => {
	var mock = new MockAdapter(axios, { delayResponse: 500 });
	mock.onPost('/api/v1/account/update-password').reply(200);

	const { getAllByTestId, queryByTestId } = renderWithRoute(
		<UpdatePassword onClose={() => null} onSuccess={() => null} resetToken={'random-token'} />
	);

	fireEvent.change(getAllByTestId('Input')[0], { target: { value: 'password' } });
	fireEvent.change(getAllByTestId('Input')[1], { target: { value: 'password' } });

	expect(getAllByTestId('Input')[2]).toBeUndefined();

	fireEvent.click(queryByTestId('UpdatePassword-ActionButton'));
});

it('displays a server side error', async () => {
	var mock = new MockAdapter(axios, { delayResponse: 500 });
	mock.onPost('/api/v1/account/update-password').reply(401, { data: { message: 'server error' } });

	const { getAllByTestId, queryByTestId } = renderWithRoute(
		<UpdatePassword onClose={() => null} onSuccess={() => null} resetToken={'random-token'} />
	);

	fireEvent.change(getAllByTestId('Input')[0], { target: { value: 'password' } });
	fireEvent.change(getAllByTestId('Input')[1], { target: { value: 'password' } });

	fireEvent.click(queryByTestId('UpdatePassword-ActionButton'));

	await waitForElement(() => queryByTestId('UpdatePassword-ErrorMessage'));

	expect(queryByTestId('UpdatePassword-ErrorMessage')).toHaveTextContent(/server error/i);
});
