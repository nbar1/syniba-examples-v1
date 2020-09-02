import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';

import Modal from '../shared/Modal';
import Input from '../shared/Inputs/Input';
import ActionButton from '../shared/ActionButton';

import isValidEmail from '../../helpers/isValidEmail';

const ErrorMessage = styled.div`
	font-size: 14px;
	padding-top: 10px;
	color: #ce3434;
`;

const SuccessMessage = styled.div`
	font-size: 14px;
	padding-top: 10px;
	color: #4bb529;
`;

const ForgotPassword = ({ onClose }) => {
	const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	/**
	 * recoverPassword
	 *
	 * @param {object} event
	 * @returns {void}
	 */
	const recoverPassword = async event => {
		event.preventDefault();

		if (forgotPasswordEmail === '' || isValidEmail(forgotPasswordEmail) === false) {
			setErrorMessage('You must enter a valid email address to continue');
			return;
		}

		setSuccessMessage(null);
		setErrorMessage(null);

		try {
			let responseData = await axios.post(`${process.env.REACT_APP_API_URL}/account/forgot-password`, {
				email: forgotPasswordEmail,
			});

			let { data } = responseData.data;

			setSuccessMessage(data.message);
		} catch (error) {
			setErrorMessage(error.response.data.data.message);
		}
	};

	return (
		<Modal
			data-testid="Login-ForgotPassword-Modal"
			title={'Forgot Password'}
			onClose={() => onClose()}
			width={'auto'}
			height={'auto'}
		>
			Please enter the email address associated with your account.
			{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
			{successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
			<form onSubmit={recoverPassword}>
				<Input
					data-testid="ForgotPassword-Input"
					label={'Email Address'}
					value={forgotPasswordEmail}
					onChange={ref => setForgotPasswordEmail(ref.value)}
				/>
				<ActionButton onClick={e => recoverPassword(e)}>Recover Account</ActionButton>
			</form>
		</Modal>
	);
};

ForgotPassword.propTypes = {
	onClose: PropTypes.func.isRequired,
};

export default ForgotPassword;
