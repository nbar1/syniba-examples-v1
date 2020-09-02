import React from 'react';
import { cleanup, act, fireEvent, waitForElement, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRoute from 'test-utils/renderWithRoute';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Notifications from '.';

afterEach(cleanup);

beforeEach(() => {
	var mock = new MockAdapter(axios, { delayResponse: 500 });

	const data = [
		{
			id: '1a',
			dateTime: '2019/06/25 17:27:56',
			title: 'Random Notification 0',
			priority: 'low',
			read: false,
		},
		{
			id: '2b',
			dateTime: '2019/06/25 17:27:56',
			title: 'Random Notification 1',
			priority: 'high',
			read: true,
		},
	];

	mock.onGet('/api/v1/notifications').reply(200, data);
	mock.onPatch('/api/v1/notifications/mark-as-read').reply(200);
});

it('renders', async () => {
	act(() => {
		const {} = renderWithRoute(<Notifications />);
	});
});

it('opens when you mouse over', async () => {
	const { getByTestId, queryByTestId } = renderWithRoute(<Notifications />);

	fireEvent.mouseEnter(getByTestId('Notifcations-NotificationsWrapper'));

	await waitForElement(() => getByTestId('Notifications-NotificationList'));

	expect(queryByTestId('Notifications-NotificationList')).toBeInTheDocument();
});

it('closes when you mouse out', async () => {
	const { getByTestId, queryByTestId } = renderWithRoute(<Notifications />);

	fireEvent.mouseEnter(getByTestId('Notifcations-NotificationsWrapper'));

	await waitForElement(() => getByTestId('Notifications-NotificationList'));

	expect(queryByTestId('Notifications-NotificationList')).toBeInTheDocument();

	fireEvent.mouseLeave(getByTestId('Notifcations-NotificationsWrapper'));

	expect(queryByTestId('Notifications-NotificationList')).toBeNull();
});

it('marks a notification as read when clicked', async () => {
	const { getByTestId, getAllByTestId } = renderWithRoute(<Notifications />);

	fireEvent.mouseEnter(getByTestId('Notifcations-NotificationsWrapper'));

	await waitForElement(() => getByTestId('Notifications-NotificationList'));

	fireEvent.click(getAllByTestId('Notification-NotificationWrapper')[1]);

	fireEvent.click(getAllByTestId('Notification-NotificationWrapper')[0]);
});
