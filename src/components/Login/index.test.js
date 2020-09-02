import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRoute from '../../test-utils/renderWithRoute';

import Login from '.';

afterEach(cleanup);

it('renders', () => {
	renderWithRoute(<Login />);
});
