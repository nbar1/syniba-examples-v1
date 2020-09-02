import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRoute from 'test-utils/renderWithRoute';

import Modal from './Modal';

afterEach(cleanup);

it('renders', () => {
	renderWithRoute(<Modal onClose={() => null}>Modal Content</Modal>);
});

it('closes when X is clicked', () => {
	const onClose = jest.fn(() => null);

	const { getByTestId } = renderWithRoute(<Modal onClose={() => onClose()}>Modal Content</Modal>);

	fireEvent.click(getByTestId('Modal-CloseButton'));

	expect(onClose).toBeCalledTimes(1);
});
