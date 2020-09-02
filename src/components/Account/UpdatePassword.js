import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';

import Modal from '../shared/Modal';
import Input from '../shared/Inputs/Input';
import ActionButton from '../shared/ActionButton';

const ErrorMessage = styled.div`
	font-size: 14px;
	padding-top: 10px;
	color: #ce3434;
`;

const UpdatePassword = ({ onClose, onSuccess, description, resetToken, title = 'Change Password' }) => {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);

	/**
	 * recoverPassword
	 *
	 * @param {object} event
	 * @returns {void}
	 */
	const updatePassword = async event => {
		event.preventDefault();

		if (newPassword !== newPasswordConfirmation) {
			setErrorMessage('Your passwords must match to continue.');
			return;
		}

		if (newPassword.length < 8) {
			setErrorMessage('Your password must be at least 8 characters long.');
			return;
		}

		setErrorMessage(null);

		let payload = { newPassword };

		if (resetToken) {
			payload = { ...payload, token: resetToken };
		} else {
			payload = { ...payload, currentPassword };
		}

		try {
			await axios.post(`${process.env.REACT_APP_API_URL}/account/update-password`, payload);

			onSuccess();
			onClose();
		} catch (error) {
			setErrorMessage(error.response.data.data.message);
		}
	};

	return (
		<Modal
			data-testid="Login-ForgotPassword-Modal"
			title={title}
			onClose={() => onClose()}
			width={'auto'}
			height={'auto'}
			closeOnOutsideClick={false}
		>
			{description}
			{errorMessage && <ErrorMessage data-testid={'UpdatePassword-ErrorMessage'}>{errorMessage}</ErrorMessage>}
			<form onSubmit={updatePassword}>
				{!resetToken && (
					<Input
						type={'password'}
						label={'Current Password'}
						value={currentPassword}
						onChange={ref => setCurrentPassword(ref.value)}
					/>
				)}
				<Input
					type={'password'}
					label={'New Password'}
					value={newPassword}
					onChange={ref => setNewPassword(ref.value)}
				/>
				<Input
					type={'password'}
					label={'Confirm New Password'}
					value={newPasswordConfirmation}
					onChange={ref => setNewPasswordConfirmation(ref.value)}
				/>
				<ActionButton onClick={e => updatePassword(e)} data-testid={'UpdatePassword-ActionButton'}>
					Update Password
				</ActionButton>
			</form>
		</Modal>
	);
};

UpdatePassword.propTypes = {
	onClose: PropTypes.func.isRequired,
	onSuccess: PropTypes.func.isRequired,
	description: PropTypes.string,
	resetToken: PropTypes.string,
	title: PropTypes.string,
};

export default UpdatePassword;
