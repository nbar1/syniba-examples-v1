import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRoute from '../../../test-utils/renderWithRoute';

import Spinner from './Spinner';

afterEach(cleanup);

it('renders', () => {
	renderWithRoute(<Spinner />);
});

it('renders with title', () => {
	const { getByTestId } = renderWithRoute(<Spinner title={'title'} />);

	expect(getByTestId('Spinner-Title')).toHaveTextContent('title');
});

it('renders with given size', () => {
	const { getByTestId } = renderWithRoute(<Spinner size={10} />);

	expect(getByTestId('Spinner-Spin')).toHaveStyleRule('font-size', '10px');
});
