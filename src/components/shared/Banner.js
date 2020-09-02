import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Portal } from 'react-portal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BannerWrapper = styled.div`
	background: ${props => getBackgroundColor(props.type)};
	color: ${props => getTextColor(props.type)};
	left: 0;
	line-height: 50px;
	min-height: 50px;
	position: fixed;
	right: 0;
	text-align: center;
	top: 0;
	transition: transform 350ms ease-out;
	transform: translateY(-100%);
	z-index: 102;

	${props =>
		props.isOpen &&
		css`
			transform: none;
		`}
`;

const CloseButton = styled(FontAwesomeIcon)`
	color: ${props => getTextColor(props.type)};
	cursor: pointer;
	font-size: 20px;
	position: absolute;
	right: 0;
	top: 0;
	padding: 15px 15px 15px 10px;
`;

const getBackgroundColor = type => {
	switch (type) {
		case 'error':
			return '#b90606';
		case 'success':
			return '#2abd90';
		case 'info':
		default:
			return '#4286f5';
	}
};

const getTextColor = type => {
	switch (type) {
		case 'error':
			return '#d0d0d0';
		case 'success':
			return '#3c3c3c';
		case 'info':
		default:
			return '#dae5fb';
	}
};

const Banner = ({ children, type = 'success', showCloseButton = true, timeLimit, onClose }) => {
	const [isOpen, setIsOpen] = useState(null);

	// set time limit if provided
	useEffect(() => {
		if (timeLimit === undefined) return;

		let bannerTimeout = setTimeout(() => setIsOpen(false), timeLimit * 1000);

		return () => clearTimeout(bannerTimeout);
	});

	// Open drawer on initialization
	useEffect(() => {
		setTimeout(() => setIsOpen(true), 0);
	}, []);

	// Delay closing for animation
	useEffect(() => {
		if (isOpen === false) {
			setTimeout(() => onClose(), 350);
		}
	}, [isOpen, onClose]);

	return (
		<Portal>
			<BannerWrapper data-testid="Banner" type={type} isOpen={isOpen}>
				{showCloseButton && (
					<CloseButton
						icon={['fal', 'times']}
						onClick={() => setIsOpen(false)}
						type={type}
						data-testid="Banner-CloseButton"
					/>
				)}
				{children}
			</BannerWrapper>
		</Portal>
	);
};

Banner.propTypes = {
	children: PropTypes.node,
	type: PropTypes.oneOf(['error', 'success', 'info']),
	showCloseButton: PropTypes.bool,
	timeLimit: PropTypes.number,
	onClose: PropTypes.func.isRequired,
};

export default Banner;
