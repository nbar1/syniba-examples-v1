import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Portal } from 'react-portal';
import hexToRgba from 'hex-to-rgba';

const AttachedPopupWrapper = styled.div`
	background: ${props => hexToRgba(props.theme.attachedPopup.backgroundColor, props.theme.attachedPopup.opacity)};
	border-radius: 5px;
	box-sizing: border-box;
	color: #fff;
	height: auto;
	left: ${props => props.bounds.left}px;
	min-height: ${props => props.minHeight};
	min-width: ${props => props.minWidth};
	padding: 15px;
	position: absolute;
	top: ${props => props.bounds.top}px;
	z-index: 90;

	:after {
		content: '';
		position: absolute;
		top: 52px;
		${props => (props.position === 'right' ? 'left' : 'right')}: -16px;
		border-width: 8px;
		border-style: solid;
		${props =>
			props.position === 'right' &&
			css`
				border-color: transparent
					${hexToRgba(props.theme.attachedPopup.backgroundColor, props.theme.attachedPopup.opacity)}
					transparent transparent;
			`}
		${props =>
			props.position === 'left' &&
			css`
				border-color: transparent transparent transparent
					${hexToRgba(props.theme.attachedPopup.backgroundColor, props.theme.attachedPopup.opacity)};
			`}
	}
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

const AttachedPopup = ({
	children,
	onClose,
	attachTo,
	attachAt,
	position = 'right',
	minHeight = 'auto',
	minWidth = '250px',
	relative = true,
}) => {
	const [popupPosition, setPopupPosition] = useState(position);
	const [popupRef, setPopupRef] = useState(null);

	/**
	 * getPopupBounds
	 *
	 * @returns {object}
	 */
	const getPopupBounds = () => {
		if (attachAt !== undefined) return attachAt;

		if (popupRef === null) {
			return {
				top: -9999,
				left: -9999,
			};
		}

		let attachToBounds = attachTo.getBoundingClientRect();
		let popupBounds = popupRef.getBoundingClientRect();

		if (
			popupPosition !== 'left' &&
			popupBounds.right > (window.innerWidth || document.documentElement.clientWidth)
		) {
			setPopupPosition('left');
		}

		let newPopupBounds;

		if (relative === true) {
			newPopupBounds = {
				top: attachToBounds.height / 2 - 60,
				left:
					popupPosition === 'left'
						? attachToBounds.width - popupBounds.width - 28
						: attachToBounds.width + 12,
			};
		} else {
			newPopupBounds = {
				top: attachToBounds.top + attachToBounds.height / 2 - 60,
				left:
					popupPosition === 'left'
						? attachToBounds.left - popupBounds.width - 12
						: attachToBounds.left + attachToBounds.width + 12,
			};
		}

		return newPopupBounds;
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
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});

	/**
	 * AttachedPopupElements
	 *
	 * @returns {jsx}
	 */
	const attachedPopupElements = () => (
		<>
			<ContentMask data-testid="AttachedPopup-ContentMask" onClick={() => onClose()} />
			<AttachedPopupWrapper
				data-testid="AttachedPopup"
				ref={popupRef => setPopupRef(popupRef)}
				bounds={getPopupBounds()}
				position={popupPosition}
				minHeight={minHeight}
				minWidth={minWidth}
			>
				{children}
			</AttachedPopupWrapper>
		</>
	);

	if (relative) {
		return attachedPopupElements();
	} else {
		return <Portal>{attachedPopupElements()}</Portal>;
	}
};

AttachedPopup.propTypes = {
	children: PropTypes.node,
	onClose: PropTypes.func.isRequired,
	attachTo: PropTypes.object,
	attachAt: PropTypes.object,
	position: PropTypes.oneOf(['left', 'right']),
	minHeight: PropTypes.string,
	minWidth: PropTypes.string,
	relative: PropTypes.bool,
};

export default AttachedPopup;
