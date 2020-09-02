import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const SpinnerWrapper = styled.div`
	text-align: center;
`;

const SpinKF = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`;

const Spin = styled.div`
	animation: ${SpinKF} 1.1s infinite linear;
	border: 0.1em solid rgba(53, 108, 199, 0.2);
	border-left: 0.1em solid rgba(53, 108, 199, 1);
	font-size: ${props => props.size}px;
	margin: 0 auto;
	position: relative;
	text-indent: -9999em;
	transform: translateZ(0);

	&,
	&:after {
		border-radius: 50%;
		height: 1em;
		width: 1em;
	}
`;

const Title = styled.div`
	color: #6d6f71;
	font-size: ${props => props.size / 5}px;
	font-weight: bold;
	margin-top: 20px;
	text-transform: uppercase;
`;

const Spinner = ({ title, size }) => {
	size = size ? size : 60;

	return (
		<SpinnerWrapper>
			<Spin data-testid="Spinner-Spin" size={size} />
			{title && (
				<Title data-testid="Spinner-Title" size={size}>
					{title}
				</Title>
			)}
		</SpinnerWrapper>
	);
};

Spinner.propTypes = {
	title: PropTypes.string,
	size: PropTypes.number,
};

export default Spinner;
