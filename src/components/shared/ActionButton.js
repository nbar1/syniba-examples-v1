import styled from 'styled-components';

const ActionButton = styled.button`
	background: ${props => props.theme.button.background};
	border: none;
	border-radius: 2px;
	color: ${props => props.theme.button.text};
	cursor: pointer;
	font-family: HelveticaNeue-Medium, sans-serif;
	font-size: 13px;
	margin: 10px 0 0;
	padding: 7px 10px;
	text-transform: uppercase;

	&:hover {
		background: ${props => props.theme.button.backgroundHover};
		color: ${props => props.theme.button.textHover};
	}
`;

export default ActionButton;
