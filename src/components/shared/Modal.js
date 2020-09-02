import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Portal } from 'react-portal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import hexToRgba from 'hex-to-rgba';

const ModalWrapper = styled.div`
	background: ${props => hexToRgba(props.theme.modal.backgroundColor, props.theme.modal.opacity)};
	border-radius: 10px;
	box-sizing: border-box;
	box-shadow: ${props => props.theme.modal.boxShadow};
	color: #fff;
	height: ${props => props.height};
	left: 50%;
	overflow-y: ${props => props.overflowY};
	padding: 30px;
	position: fixed;
	top: 50%;
	transform: translate(-50%, -50%);
	width: ${props => props.width};
	z-index: 102;

	${props =>
		props.hasTitle &&
		css`
			padding-top: 65px;
		`}
`;

const ContentMask = styled.div`
	background: ${props => hexToRgba(props.theme.modal.maskColor, props.theme.modal.maskOpacity)};
	height: 100vh;
	left: 0;
	position: fixed;
	top: 0;
	width: 100vw;
	z-index: 101;
`;

const CloseButton = styled(FontAwesomeIcon)`
	color: ${props => props.theme.modal.closeButtonColor};
	cursor: pointer;
	font-size: 20px;
	position: absolute;
	right: 15px;
	top: 12px;

	:hover {
		color: ${props => props.theme.modal.closeButtonHoverColor};
	}
`;

const Title = styled.div`
	color: ${props => props.theme.modal.titleColor};
	cursor: default;
	font-size: 20px;
	position: absolute;
	left: 15px;
	top: 12px;
`;

const Modal = ({
	children,
	onClose,
	title,
	showCloseButton = true,
	closeOnOutsideClick = true,
	height = '40vh',
	width = '40vw',
	overflowY = 'scroll',
}) => {
	const [portalNode, setPortalNode] = useState(null);

	/**
	 * handleOutsideMouseClick
	 *
	 * @param {object} event
	 * @returns {(null|void)}
	 */
	const handleOutsideMouseClick = event => {
		const root = portalNode.props.node || portalNode.defaultNode;
		if (!root || root.contains(event.target) || (event.button && event.button !== 0)) return;

		onClose();
	};

	/**
	 * handleKeyDown
	 *
	 * @param {object} event
	 * @returns {void}
	 */
	const handleKeyDown = event => {
		if (event.keyCode === 27) {
			onClose();
		}
	};

	// Set event handlers
	useEffect(() => {
		if (closeOnOutsideClick) {
			document.addEventListener('click', handleOutsideMouseClick);
		}

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			if (closeOnOutsideClick) {
				document.removeEventListener('click', handleOutsideMouseClick);
			}

			document.removeEventListener('keydown', handleKeyDown);
		};
	});

	return (
		<>
			<ContentMask data-testid="Modal-ContentMask" />
			<Portal ref={portalNode => setPortalNode(portalNode)}>
				<ModalWrapper hasTitle={!!title} width={width} height={height} data-testid="Modal">
					{showCloseButton && (
						<CloseButton
							icon={['fal', 'times']}
							onClick={() => onClose()}
							data-testid="Modal-CloseButton"
						/>
					)}
					{title && <Title>{title}</Title>}
					{children}
				</ModalWrapper>
			</Portal>
		</>
	);
};

Modal.propTypes = {
	children: PropTypes.node,
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string,
	showCloseButton: PropTypes.bool,
	closeOnOutsideClick: PropTypes.bool,
	height: PropTypes.string,
	width: PropTypes.string,
	overflowY: PropTypes.string,
};

export default Modal;
