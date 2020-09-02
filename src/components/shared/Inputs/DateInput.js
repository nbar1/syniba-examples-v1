import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-datepicker';

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

const DatePickerWrapper = styled.div`
	.react-datepicker__input-container > input {
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
		top: -15px;
		width: ${props => props.width};

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
	}
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

const DateInput = ({
	label,
	value = null,
	clearable = false,
	onChange = () => null,
	width = '325px',
	hasError = false,
	showTime = false,
	...props
}) => {
	const [hasFocusOrContent, setHasFocusOrContent] = useState(false);
	const inputRef = useRef();

	// set initial value
	useEffect(() => {
		setHasFocusOrContent(value !== '');
	}, [value]);

	/**
	 * clearInput
	 *
	 * @returns {void}
	 */
	const clearInput = () => {
		inputRef.current.value = null;

		onChange(null);
		setTimeout(() => setHasFocusOrContent(false), 0);
	};

	return (
		<InputWrapper width={width} hasError={hasError}>
			<Label hasFocusOrContent={hasFocusOrContent}>{label}</Label>
			<DatePickerWrapper width={width} hasFocusOrContent={hasFocusOrContent}>
				<DatePicker
					ref={inputRef}
					selected={value}
					onChange={date => {
						onChange(date);
					}}
					showTimeSelect={showTime}
					timeIntervals={15}
					dateFormat={showTime ? 'MMMM d, yyyy - h:mm aa' : 'MMMM d, yyyy'}
					timeCaption="time"
					shouldCloseOnSelect={true}
					popperModifiers={{
						offset: {
							enabled: true,
							offset: '0px, 25px',
						},
					}}
					{...props}
					data-testid={'DateInput'}
				/>
			</DatePickerWrapper>
			{clearable && hasFocusOrContent && (
				<ClearInput onClick={() => clearInput()}>
					<FontAwesomeIcon icon={('fal', 'times')} />
				</ClearInput>
			)}
		</InputWrapper>
	);
};

DateInput.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.any,
	clearable: PropTypes.bool,
	onChange: PropTypes.func,
	width: PropTypes.string,
	hasError: PropTypes.bool,
	showTime: PropTypes.bool,
};

export default DateInput;
