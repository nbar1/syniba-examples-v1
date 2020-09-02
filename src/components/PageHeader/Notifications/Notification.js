import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import moment from 'moment';

const NotificationWrapper = styled.div`
	border-bottom: 1px solid ${props => props.theme.notifications.border};
	cursor: pointer;
	min-height: 40px;
	padding: 10px;
	position: relative;

	:hover {
		background: ${props => props.theme.notifications.backgroundHover};
	}
`;

const Column = styled.div`
	display: inline-block;
	vertical-align: middle;
`;

const UnreadStatus = styled.div`
	display: inline-block;
	padding-right: 8px;

	${props =>
		props.unread &&
		css`
			:after {
				background: #b90606;
				bottom: 0;
				content: '';
				left: 0;
				position: absolute;
				top: 0;
				width: 4px;
			}
		`}
`;

const Title = styled.div`
	color: ${props => props.theme.notifications.title};
	display: block;
	font-size: 16px;
	padding-bottom: 6px;
`;

const DateTime = styled.div`
	color: ${props => props.theme.notifications.subtitle};
	display: block;
	font-size: 12px;
`;

const Notification = ({ item, onClick }) => {
	return (
		<NotificationWrapper data-testid="Notification-NotificationWrapper" onClick={onClick}>
			<Column>
				<UnreadStatus data-testid="Notification-UnreadStatus" priority={item.priority} unread={!item.read} />
			</Column>
			<Column>
				<Title data-testid="Notification-Title">{item.title}</Title>
				<DateTime>{moment(new Date(item.dateTime)).fromNow()}</DateTime>
			</Column>
		</NotificationWrapper>
	);
};

Notification.propTypes = {
	item: PropTypes.object.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default Notification;
