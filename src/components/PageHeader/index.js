import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme, css } from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import { defaultTheme, lightTheme } from '../../themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import equal from 'deep-equal';
import hexToRgba from 'hex-to-rgba';

import { navigation } from '../../helpers/navigation';
import Notifications from './Notifications';

const StyledHeader = styled.div`
	margin: 0 0 23px 80px;
	position: relative;

	@media print {
		display: none !important;
	}
`;

const Contrast = styled.div`
	color: #686d7a;
	cursor: pointer;
	font-size: 28px;
	line-height: 38px;
	position: fixed;
	right: 90px;
	top: 23px;
	z-index: 21;

	:hover {
		color: #007bff;
	}
`;

const Navigation = styled.div`
	background-color: ${props => props.theme.backgroundColor};
	display: inline-block;
	left: calc(${props => props.theme.layout.sidebar.width} + 45px);
	position: fixed;
	top: 33px;
	transition: left 0.5s;
	z-index: 20;
`;

const LinkWrapper = styled.div`
	display: inline-block;
	margin: 0 15px;
	font-size: 18px;
	text-transform: uppercase;

	a {
		color: ${props => props.theme.navigation.header.link};
		text-decoration: none;

		${props =>
			props.active &&
			css`
				color: ${props => props.theme.navigation.header.activeLink};
			`}
	}
`;

const BackgroundFade = styled.div`
	background: linear-gradient(
		${props => hexToRgba(props.theme.backgroundColor, 1)} 80%,
		${props => hexToRgba(props.theme.backgroundColor, 0)}
	);
	height: 80px;
	left: 0;
	pointer-events: none;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 19;
`;

const NotificationsWrapper = styled.div`
	position: fixed;
	right: 45px;
	top: 23px;
	z-index: 30;
`;

const PageHeader = ({ theme, setTheme, location }) => {
	return (
		<StyledHeader>
			<Navigation>
				{navigation.map((route, i) => {
					let toWithMemory = {
						pathname: route.to,
						state: {
							previousRoute: location.pathname,
						},
					};

					return (
						<LinkWrapper key={i} active={location.pathname.indexOf(route.to) === 0}>
							<Link to={toWithMemory}>{route.title}</Link>
						</LinkWrapper>
					);
				})}
			</Navigation>
			<Contrast
				data-testid="PageHeader-Contrast"
				onClick={() => setTheme(equal(theme, defaultTheme) ? lightTheme : defaultTheme)}
			>
				<FontAwesomeIcon icon={['fal', 'eclipse']} />
			</Contrast>

			<NotificationsWrapper>
				<Notifications />
			</NotificationsWrapper>
			<BackgroundFade />
		</StyledHeader>
	);
};

PageHeader.propTypes = {
	setTheme: PropTypes.func.isRequired,
	theme: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
};

export default withTheme(withRouter(PageHeader));
