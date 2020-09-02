import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Portal } from 'react-portal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import hexToRgba from 'hex-to-rgba';

import Spacer from './Spacer';

const DrawerWrapper = styled.div`
	background: ${props => hexToRgba(props.theme.drawer.backgroundColor, props.theme.drawer.opacity)};
	box-sizing: border-box;
	height: 100vh;
	min-width: 375px;
	overflow-y: scroll;
	padding: 30px;
	position: fixed;
	right: 0;
	top: 0;
	transition: transform 350ms ease-out;
	transform: translateX(100%);
	z-index: 90;

	${props =>
		props.isOpen &&
		css`
			transform: none;
		`}
`;

const ContentMask = styled.div`
	background: transparent;
	height: 100vh;
	left: 0;
	position: fixed;
	top: 0;
	width: 100vw;
	z-index: 80;
`;

const CloseButton = styled(FontAwesomeIcon)`
	color: ${props => props.theme.drawer.closeButtonColor};
	cursor: pointer;
	font-size: 35px;
	position: fixed;
	right: 25px;
	top: 20px;
`;

const Title = styled.div`
	color: ${props => props.theme.drawer.mainTextColor};
	font-size: 24px;
	padding: 10px 0 15px;
`;

const Subtitle = styled.div`
	font-size: 12px;
	color: ${props => props.theme.drawer.mainTextColor};
	text-transform: uppercase;
`;

const Drawer = ({ children, onClose, title, subtitle }) => {
	const [isOpen, setIsOpen] = useState(null);
	const [portalNode, setPortalNode] = useState(null);

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

	/**
	 * handleOutsideMouseClick
	 *
	 * @param {object} event
	 * @returns {(null|void)}
	 */
	const handleOutsideMouseClick = event => {
		if (isOpen === false) return;

		const root = portalNode.props.node || portalNode.defaultNode;
		if (!root || root.contains(event.target) || (event.button && event.button !== 0)) return;

		setIsOpen(false);
	};

	/**
	 * handleKeyDown
	 *
	 * @param {object} event
	 * @returns {void}
	 */
	const handleKeyDown = event => {
		if (event.keyCode === 27 && isOpen) {
			setIsOpen(false);
		}
	};

	// Set event handlers
	useEffect(() => {
		document.addEventListener('click', handleOutsideMouseClick);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('click', handleOutsideMouseClick);
			document.removeEventListener('keydown', handleKeyDown);
		};
	});

	return (
		<>
			{isOpen && <ContentMask data-testid="Drawer-ContentMask" />}
			<Portal ref={portalNode => setPortalNode(portalNode)}>
				<DrawerWrapper isOpen={isOpen} data-testid="Drawer">
					<CloseButton
						icon={['fal', 'times']}
						onClick={() => setIsOpen(false)}
						data-testid="Drawer-CloseButton"
					/>
					{title && (
						<>
							{subtitle && <Subtitle data-testid="Drawer-Subtitle">{subtitle}</Subtitle>}
							<Title data-testid="Drawer-Title">{title}</Title>
							<Spacer />
						</>
					)}
					{children}
				</DrawerWrapper>
			</Portal>
		</>
	);
};

Drawer.propTypes = {
	children: PropTypes.node,
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string,
	subtitle: PropTypes.string,
};

export default Drawer;
export { Drawer };
