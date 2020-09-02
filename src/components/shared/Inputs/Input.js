import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InputWrapper = styled.div`
	background: ${props => props.theme.input.background};
	border-radius: 4px;
	border: ${props => props.theme.input.border};
	box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
	box-sizing: border-box;
	color: ${props => props.theme.input.textColor};
	height: 50px;
	margin: 15px 0;
	position: relative;
	width: ${props => props.width};

	${props =>
		props.hasError &&
		css`
			border: ${props.theme.input.errorBorder};
			box-shadow: ${props.theme.input.errorBoxShadow};
		`}
`;

const Label = styled.div`
	color: ${props => props.theme.input.labelColor};
	font-size: 16px;
	left: 15px;
	line-height: 50px;
	position: absolute;
	text-transform: uppercase;
	transition: 0.2s;

	${props =>
		props.hasFocusOrContent &&
		css`
			font-size: 10px;
			margin-top: 10px;
			line-height: 10px;
		`};
`;

const StyledInput = styled.input`
	background: transparent;
	border: none;
	box-sizing: border-box;
	color: ${props => props.theme.input.textColor};
	font-size: 14px;
	height: 50px;
	left: 0;
	opacity: 0;
	padding: 0 15px;
	position: absolute;
	top: 0;
	width: 100%;

	:focus {
		outline: none;
	}

	${props =>
		props.hasFocusOrContent &&
		css`
			opacity: 1;
			padding-top: 13px;
		`}

	${props =>
		props.hasFocusOrContent &&
		props.clearable &&
		css`
			padding-right: 45px;
		`}
`;

const ClearInput = styled.div`
	background: ${props => props.theme.neutralDarker};
	border-radius: 13px;
	box-sizing: border-box;
	color: ${props => props.theme.neutralLighter};
	cursor: pointer;
	font-size: 13px;
	height: 26px;
	line-height: 26px;
	margin: 12px;
	position: absolute;
	right: 0;
	text-align: center;
	top: 0;
	width: 26px;

	:hover {
		background: ${props => props.theme.primaryMuted};
		color: ${props => props.theme.input.background};
	}
`;

const ErrorMessage = styled.div`
	color: ${props => props.theme.input.errorMessageColor};
	font-size: 14px;
	margin-left: 10px;
`;

const Input = ({
	label,
	type = 'text',
	value = '',
	clearable = false,
	onChange = () => null,
	onBlur = () => null,
	width = '325px',
	hasError = false,
	errorMessage,
}) => {
	const [hasFocusOrContent, setHasFocusOrContent] = useState(false);
	const inputRef = useRef();

	// set initial value
	useEffect(() => {
		setHasFocusOrContent(value !== '');
	}, [value]);

	/**
	 * blurInput
	 *
	 * @returns {void}
	 */
	const blurInput = () => {
		setHasFocusOrContent(inputRef.current.value !== '');

		onBlur();
	};

	/**
	 * clearInput
	 *
	 * @returns {void}
	 */
	const clearInput = () => {
		inputRef.current.value = '';

		setHasFocusOrContent(false);
		onChange(inputRef.current);
	};

	return (
		<div>
			<InputWrapper width={width} hasError={hasError || !!errorMessage}>
				<Label hasFocusOrContent={hasFocusOrContent} data-testid="Input-Label">
					{label}
				</Label>
				<StyledInput
					type={type}
					value={value}
					ref={inputRef}
					onFocus={() => setHasFocusOrContent(true)}
					onBlur={event => blurInput(inputRef.current, event)}
					onChange={event => onChange(inputRef.current, event)}
					hasFocusOrContent={hasFocusOrContent}
					clearable={clearable}
					aria-label={label}
					data-testid={'Input'}
				/>
				{clearable && hasFocusOrContent && (
					<ClearInput onClick={() => clearInput()} data-testid="Input-ClearInput">
						<FontAwesomeIcon icon={('fal', 'times')} />
					</ClearInput>
				)}
			</InputWrapper>
			{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
		</div>
	);
};

Input.propTypes = {
	label: PropTypes.string.isRequired,
	type: PropTypes.string,
	value: PropTypes.string,
	clearable: PropTypes.bool,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	width: PropTypes.string,
	hasError: PropTypes.bool,
	errorMessage: PropTypes.string,
};

export default Input;
