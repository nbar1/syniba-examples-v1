import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRoute from '../../../../test-utils/renderWithRoute';

import SkeletonLine from './Line';

afterEach(cleanup);

it('renders', () => {
	renderWithRoute(<SkeletonLine />);
});

it('renders with set width', () => {
	const { getByTestId } = renderWithRoute(<SkeletonLine width={'100px'} />);

	expect(getByTestId('SkeletonLine')).toHaveStyleRule('width', '100px');
});

it('renders with set height', () => {
	const { getByTestId } = renderWithRoute(<SkeletonLine height={'20px'} />);

	expect(getByTestId('SkeletonLine')).toHaveStyleRule('height', '20px');
});
