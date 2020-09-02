import React from 'react';
import { cleanup, fireEvent, waitForElement } from '@testing-library/react';
import renderWithRoute from 'test-utils/renderWithRoute';

import Spacer from './Spacer';

afterEach(cleanup);

it('renders', () => {
	renderWithRoute(<Spacer />);
});
