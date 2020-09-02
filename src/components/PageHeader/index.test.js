import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import renderWithRoute from '../../test-utils/renderWithRoute';

import PageHeader from '.';
import { defaultTheme } from '../../themes';

afterEach(cleanup);

it('renders', () => {
	const setTheme = jest.fn(() => null);

	renderWithRoute(<PageHeader setTheme={setTheme} theme={{}} location={{ pathname: '/' }} />);
});

it('changes theme to light', () => {
	const setTheme = jest.fn(() => null);

	const { getByTestId } = renderWithRoute(
		<PageHeader setTheme={setTheme} theme={defaultTheme} location={{ pathname: '/' }} />
	);

	expect(setTheme).toBeCalledTimes(0);

	fireEvent.click(getByTestId('PageHeader-Contrast'));

	setTimeout(() => expect(setTheme).toBeCalledTimes(1), 100);
});

it('changes theme to default', () => {
	const setTheme = jest.fn(() => null);

	const { getByTestId } = renderWithRoute(<PageHeader setTheme={setTheme} theme={{}} location={{ pathname: '/' }} />);

	expect(setTheme).toBeCalledTimes(0);

	fireEvent.click(getByTestId('PageHeader-Contrast'));

	setTimeout(() => expect(setTheme).toBeCalledTimes(1), 100);
});
