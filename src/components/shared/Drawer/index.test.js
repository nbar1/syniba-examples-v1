import React from 'react';
import { fireEvent, cleanup, waitForElement, waitForElementToBeRemoved, wait } from '@testing-library/react';
import renderWithRoute from '../../../test-utils/renderWithRoute';

import Drawer from '.';
import Spacer from './Spacer';
import ActionButton from '../ActionButton';

afterEach(cleanup);

it('renders', () => {
	const {} = renderWithRoute(<Drawer onClose={() => null} />);
});

it('renders with title', () => {
	const { getByTestId } = renderWithRoute(<Drawer onClose={() => null} title="title" />);

	expect(getByTestId('Drawer-Title')).toHaveTextContent('title');
});

it('renders with subtitle', () => {
	const { getByTestId } = renderWithRoute(<Drawer onClose={() => null} title="title" subtitle="subtitle" />);

	expect(getByTestId('Drawer-Subtitle')).toHaveTextContent('subtitle');
});

it('renders with Spacer', () => {
	const onClose = jest.fn(() => {});

	const {} = renderWithRoute(
		<Drawer onClose={onClose}>
			<Spacer />
		</Drawer>
	);
});

it('renders with ActionButton', () => {
	const onClose = jest.fn(() => {});

	const {} = renderWithRoute(
		<Drawer onClose={onClose}>
			<ActionButton>Test</ActionButton>
		</Drawer>
	);
});
