import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRoute from '../../test-utils/renderWithRoute';

import Banner from './Banner';

afterEach(cleanup);

it('renders default', () => {
	renderWithRoute(<Banner onClose={() => null}>Default Banner</Banner>);
});

it('renders as an error', () => {
	renderWithRoute(
		<Banner type={'error'} onClose={() => null}>
			Error Banner
		</Banner>
	);
});

it('renders as a success', () => {
	renderWithRoute(
		<Banner type={'success'} onClose={() => null}>
			Success Banner
		</Banner>
	);
});

it('renders as an info', () => {
	renderWithRoute(
		<Banner type={'info'} onClose={() => null}>
			Info Banner
		</Banner>
	);
});

it('closes when X is clicked', () => {
	const onClose = jest.fn(() => null);

	const { getByTestId } = renderWithRoute(
		<Banner type={'info'} onClose={() => onClose()}>
			Info Banner
		</Banner>
	);

	fireEvent.click(getByTestId('Banner-CloseButton'));

	expect(onClose).toBeCalledTimes(1);
});
