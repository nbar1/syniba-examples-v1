import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import styled, { css, createGlobalStyle } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import { AuthenticationContext } from '../../AuthenticationContext';

import ForgotPassword from './ForgotPassword';
import UpdatePassword from '../Account/UpdatePassword';
import Spinner from '../shared/Loader/Spinner';
import Banner from '../shared/Banner';

import logo from '../../images/logo.png';

const GlobalStyle = createGlobalStyle`
	html {
		background-position: bottom;
		background-repeat: no-repeat;
		background-size: 100%;
	}
`;

const LoginWrapper = styled.div`
	align-items: center;
	display: block;
	margin: 20% auto 0;
	text-align: center;
	width: 330px;
`;

const Logo = styled.img`
	display: inline-block;
	height: 42px;
`;

const ErrorMessage = styled.div`
	color: #bd2c2c;
	font-size: 14px;
	height: 16px;
`;

const InputField = styled.div`
	background: rgba(66, 133, 244, 0.14);
	border: 1px solid #303339;
	border-radius: 0 0 2px 2px;
	box-shadow: 0 5px 5px 0 rgba(57, 59, 64, 0.07);
	color: #fff;
	height: 20px;
	padding: 13px 17px 12px;
	text-align: left;

	&:first-child {
		border-bottom: 0;
		border-radius: 2px 2px 0 0;
		margin-top: 32px;
	}

	label {
		color: ${props => props.theme.neutralLighter};
		display: inline-block;
		font-family: 'Archivo', sans-serif;
		font-size: 14px;
		font-weight: 400;
		width: 100px;
	}

	input {
		background: transparent;
		border: none;
		color: #fff;
		display: inline-block;
		font-family: 'Archivo', sans-serif;
		font-size: 14px;
		font-weight: 500;
		height: 46px;
		margin: -14px 0 0 -100px;
		padding-left: 115px;
		position: absolute;
		width: 194px;
		outline: none;
	}
`;

const SignInButton = styled.div`
	background: ${props => props.theme.primaryMuted};
	border-radius: 2px;
	height: 45px;
	margin: 22px 0 28px;
	width: 100%;

	${props =>
		props.isLoading &&
		css`
			opacity: 0.5;
		`}

	> input {
		background: transparent;
		border: 0;
		color: #fff;
		cursor: pointer;
		font-family: 'Archivo', sans-serif;
		font-size: 14px;
		font-weight: 400;
		height: 100%;
		width: 100%;
	}
`;

const LoaderWrapper = styled.div`
	display: inline-block;
	margin: 8px auto 0;
`;

const AdditionalOptions = styled.div`
	line-height: 14px;
	text-align: left;
`;

const ForgotPasswordLink = styled.div`
	color: ${props => props.theme.primaryMuted};
	cursor: pointer;
	float: right;
	font-family: 'HelveticaNeue';
	font-size: 12px;

	:hover {
		text-decoration: underline;
	}
`;

const RememberMe = styled.span`
	font-family: 'Archivo', sans-serif;
	font-size: 14px;
	font-weight: 400;
	color: ${props => props.theme.neutralLighter};
	cursor: pointer;

	.fa-square,
	.fa-check-square {
		margin-right: 13px;
		margin-left: 5px;
	}
`;

const Form = () => {
	const [rememberMe, setRememberMe] = useState(false);
	const [processingLogin, setProcessingLogin] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showForgotPassword, setShowForgotPassword] = useState(false);
	const [showUpdateExpiredPassword, setShowUpdateExpiredPassword] = useState(false);
	const [bannerText, setBannerText] = useState(null);
	const [passwordResetToken, setPasswordResetToken] = useState(null);
	const authenticationContext = useContext(AuthenticationContext);

	/**
	 * handleLogin
	 *
	 * @param {object} event
	 * @returns {void}
	 */
	const handleLogin = async event => {
		event.preventDefault();

		setProcessingLogin(true);
		setErrorMessage('');

		try {
			await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { username, password });

			applyRememberMe();
			authenticationContext.login();
		} catch (error) {
			if (error.response.status === 401 && error.response.data.metadata.type === 'expired') {
				setPasswordResetToken(error.response.data.metadata.resetToken);
				setShowUpdateExpiredPassword(true);
			}

			setProcessingLogin(false);
			setErrorMessage(error.response.data.message);
		}
	};

	/**
	 * setRememberMe
	 *
	 * @returns {void}
	 */
	const applyRememberMe = () => {
		if (rememberMe === true) {
			Cookies.set('aap-remember-me', username, { expires: 30 });
		} else {
			Cookies.remove('aap-remember-me');
		}
	};

	/**
	 * clearFields
	 *
	 * @returns {void}
	 */
	const clearFields = () => {
		setUsername('');
		setPassword('');
	};

	// Apply username if it's held in a cookie
	useEffect(() => {
		if (Cookies.get('aap-remember-me') === undefined) return;

		setUsername(Cookies.get('aap-remember-me'));
		setRememberMe(true);
	}, []);

	return (
		<LoginWrapper data-testid="Login-LoginWrapper">
			<Logo src={logo} alt="Syniba Analytics" />
			<ErrorMessage>{errorMessage}</ErrorMessage>
			<form onSubmit={handleLogin}>
				<InputField>
					<label>email address</label>
					<input
						data-testid="Form-username"
						type="text"
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
				</InputField>
				<InputField>
					<label>password</label>
					<input
						data-testid="Form-password"
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</InputField>
				<SignInButton isLoading={processingLogin}>
					{!processingLogin && (
						<input
							data-testid="Form-submit"
							type="submit"
							onClick={handleLogin}
							value={'Sign In'}
							title={'Sign In'}
						/>
					)}
					{processingLogin && (
						<LoaderWrapper>
							<Spinner size={25} />
						</LoaderWrapper>
					)}
				</SignInButton>
				<AdditionalOptions>
					<RememberMe data-testid="Form-RememberMe" onClick={() => setRememberMe(!rememberMe)}>
						<FontAwesomeIcon icon={rememberMe ? 'check-square' : ['far', 'square']} />
						Remember me
					</RememberMe>
					<ForgotPasswordLink
						data-testid="Form-ForgotPasswordLink"
						onClick={() => setShowForgotPassword(true)}
					>
						Forgot Password?
					</ForgotPasswordLink>
					{showForgotPassword && <ForgotPassword onClose={() => setShowForgotPassword(false)} />}
				</AdditionalOptions>
			</form>
			<GlobalStyle />
			{showUpdateExpiredPassword && (
				<UpdatePassword
					onClose={() => setShowUpdateExpiredPassword(false)}
					onSuccess={() => {
						setBannerText('You may now log in with your updated credentials.');
						clearFields();
					}}
					description={'Your password has expired. Please create a new password below to continue.'}
					resetToken={passwordResetToken}
				/>
			)}
			{bannerText !== null && <Banner onClose={() => setBannerText(null)}>{bannerText}</Banner>}
		</LoginWrapper>
	);
};

export default Form;
