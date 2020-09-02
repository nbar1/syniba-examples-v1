import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Notification from './Notification';

const NotificationsWrapper = styled.div`
	position: relative;
`;

const NotificationIcon = styled.div`
	color: #686d7a;
	cursor: pointer;
	font-size: 28px;
	line-height: 38px;
	text-align: center;
	width: 24px;
	z-index: 30;

	:hover {
		color: #007bff;
	}

	${props =>
		props.showBadge &&
		css`
			:before {
				background: ${props => props.theme.alert.backgroundColor};
				border-radius: 50%;
				content: '';
				height: 8px;
				position: absolute;
				right: 1px;
				top: 7px;
				width: 8px;
			}
		`}

	${props =>
		props.active &&
		css`
			color: #007bff;

			:after {
				border-color: transparent transparent ${props => props.theme.notifications.background} transparent;
				border-style: solid;
				border-width: 12px;
				content: '';
				left: 0;
				position: absolute;
				top: 26px;
				z-index: 23;
			}
		`};
`;

const NotificationList = styled.div`
	background: ${props => props.theme.notifications.background};
	border-radius: 4px;
	box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.5);
	color: ${props => props.theme.filter.textColor};
	font-size: 12px;
	max-height: 40vh;
	min-width: 300px;
	overflow-y: scroll;
	position: absolute;
	right: -25px;
	top: 50px;
	z-index: 30;
`;

const MouseBufferZone = styled.div`
	background: transparent;
	bottom: -72px;
	height: 78px;
	position: absolute;
	right: -20px;
	transform: rotate(325deg);
	width: 130px;
	z-index: -1;
`;

const Notifications = () => {
	const [showNotifications, setShowNotifications] = useState(false);
	const [data, setData] = useState([]);
	const [showBadge, setShowBadge] = useState(false);
	const [queuedUpdate, setQueuedUpdate] = useState(false);

	/**
	 * getUpdatedData
	 *
	 * @returns {void}
	 */
	const getUpdatedData = async () => {
		// don't update if the tab isn't active or browser in view
		if (document.hidden === true) {
			setQueuedUpdate(true);
			return;
		}

		try {
			let { data } = await axios.get(
				`${process.env.REACT_APP_API_URL}/notifications?sort={"id":"dateTime","desc":true,"dateTimeField":"dateTime"}`
			);
			setData(data);
		} catch (error) {
			// error message
		}
	};

	/**
	 * checkForFocusUpdate
	 *
	 * @returns {void}
	 */
	const checkForFocusUpdate = () => {
		if (queuedUpdate === false) return;

		setQueuedUpdate(false);
		getUpdatedData();
	};

	/**
	 * markAsRead
	 *
	 * @param {string} id
	 * @returns {void}
	 */
	const markAsRead = async id => {
		const notificationIndex = data.findIndex(obj => obj.id === id);
		if (notificationIndex === -1 || data[notificationIndex].read === true) return;

		try {
			await axios.patch(`${process.env.REACT_APP_API_URL}/notifications/mark-as-read`, { id });

			// update notification in data
			const updatedNotification = { ...data[notificationIndex], read: true };
			setData([...data.slice(0, notificationIndex), updatedNotification, ...data.slice(notificationIndex + 1)]);
		} catch (error) {
			// error message
		}
	};

	// get data on initial load
	useEffect(() => {
		const getInitialData = async () => {
			try {
				let { data } = await axios.get(
					`${process.env.REACT_APP_API_URL}/notifications?sort={"id":"dateTime","desc":true,"dateTimeField":"dateTime"}`
				);
				setData(data);
			} catch (error) {
				// error message
			}
		};

		getInitialData();
	}, []);

	// Determine unread notification count
	useEffect(() => {
		let unreadNotifications = data.filter(notification => !notification.read);

		setShowBadge(unreadNotifications.length > 0);
	}, [data]);

	// set up listener for window focus
	useEffect(() => {
		window.addEventListener('focus', checkForFocusUpdate);

		return () => {
			window.removeEventListener('focus', checkForFocusUpdate);
		};
	});

	// set auto-update
	useEffect(() => {
		let autoUpdateInterval = setInterval(() => getUpdatedData(), 60000);

		return () => {
			clearInterval(autoUpdateInterval);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<NotificationsWrapper
			data-testid="Notifcations-NotificationsWrapper"
			onMouseEnter={() => setShowNotifications(true)}
			onMouseLeave={() => {
				setShowNotifications(false);
			}}
		>
			<NotificationIcon active={showNotifications && data.length > 0} showBadge={showBadge}>
				<FontAwesomeIcon icon={['fal', 'bell']} />
			</NotificationIcon>
			{showNotifications && data.length > 0 && (
				<>
					<MouseBufferZone />
					<NotificationList data-testid="Notifications-NotificationList">
						{data.length > 0 && (
							<div>
								{data.map((notification, i) => {
									return (
										<Notification
											key={i}
											item={notification}
											onClick={() => markAsRead(notification.id)}
										/>
									);
								})}
							</div>
						)}
					</NotificationList>
				</>
			)}
		</NotificationsWrapper>
	);
};

export default Notifications;
