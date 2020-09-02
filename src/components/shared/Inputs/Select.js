import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const SelectWrapper = styled.div`
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

	:after {
		content: '▸';
		color: ${props => props.theme.neutralLighter};
		pointer-events: none;
		position: absolute;
		right: 15px;
		top: 15px;
		transform: rotate(90deg);
	}

	${props =>
		props.hasError &&
		css`
			border: ${props.theme.input.errorBorder};
			box-shadow: ${props.theme.input.errorBoxShadow};
		`}
`;

const Label = styled.div`
	color: ${props => props.theme.input.labelColor};
	font-size: 10px;
	left: 15px;
	line-height: 10px;
	margin-top: 10px;
	position: absolute;
	text-transform: uppercase;

	${props =>
		props.isEmpty &&
		css`
			font-size: 16px;
			margin-top: 0;
			line-height: 50px;
		`};
`;

const StyledSelect = styled.select`
	appearance: none;
	background: transparent;
	border: none;
	box-sizing: border-box;
	color: ${props => props.theme.input.textColor};
	cursor: pointer;
	font-size: 14px;
	height: 50px;
	left: 0;
	padding: 13px 15px 0;
	position: absolute;
	top: 0;
	width: 100%;

	:focus {
		outline: none;
	}

	${props =>
		props.isEmpty &&
		css`
			opacity: 0;
		`};
`;

const Select = ({ label, value = '', children, onChange = () => null, width = '325px', hasError = false }) => {
	const [currentValue, setCurrentValue] = useState(null);
	const inputRef = useRef();

	// store value of select
	useEffect(() => {
		setCurrentValue(value);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/**
	 * onChangeValue
	 *
	 * @returns {void}
	 */
	const onChangeValue = event => {
		setCurrentValue(inputRef.current.value);

		onChange(inputRef.current, event);
	};

	return (
		<SelectWrapper width={width} hasError={hasError}>
			<Label isEmpty={currentValue === ''}>{label}</Label>
			<StyledSelect
				value={value}
				ref={inputRef}
				onChange={event => onChangeValue(event)}
				isEmpty={currentValue === ''}
				data-testid={'Select'}
			>
				{children}
			</StyledSelect>
		</SelectWrapper>
	);
};

Select.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string,
	children: PropTypes.any,
	onChange: PropTypes.func,
	width: PropTypes.string,
	hasError: PropTypes.bool,
};

export default Select;
