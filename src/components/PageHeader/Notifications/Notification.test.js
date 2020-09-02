import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRoute from '../../../test-utils/renderWithRoute';

import Notification from './Notification';

afterEach(cleanup);

it('renders', async () => {
	const {} = renderWithRoute(<Notification item={{}} onClick={() => null} />);
});

it('fires given onclick event when clicked', async () => {
	const onClick = jest.fn(() => {});

	const { getByTestId } = renderWithRoute(<Notification item={{}} onClick={() => onClick()} />);

	expect(onClick).toBeCalledTimes(0);

	fireEvent.click(getByTestId('Notification-NotificationWrapper'));

	expect(onClick).toBeCalledTimes(1);
});

it('title matches given title', async () => {
	const { getByTestId } = renderWithRoute(<Notification item={{ title: 'test title' }} onClick={() => null} />);

	expect(getByTestId('Notification-Title')).toHaveTextContent('test title');
});

it('is highlighted when marked as unread', async () => {
	const { getByTestId } = renderWithRoute(<Notification item={{ read: false }} onClick={() => null} />);

	expect(getByTestId('Notification-UnreadStatus')).toHaveStyleRule('background', '#b90606', {
		modifier: ':after',
	});
});
