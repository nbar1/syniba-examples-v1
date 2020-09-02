import styled from 'styled-components';

const Spacer = styled.div`
	background: ${props => props.theme.drawer.spacerColor};
	height: 2px;
	margin: 15px 0;
	width: 100%;
`;

export default Spacer;
