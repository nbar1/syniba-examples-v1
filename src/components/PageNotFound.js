import React from 'react';
import styled from 'styled-components';

const PageNotFoundWrapper = styled.div`
	color: #6d6f71;
	margin: 10vh auto 0;
	text-align: center;
`;

const Header = styled.div`
	font-size: 48px;
`;

const Subheader = styled.div`
	font-size: 24px;
`;

const PageNotFound = () => (
	<PageNotFoundWrapper>
		<Header>404</Header>
		<Subheader>Page Not Found</Subheader>
	</PageNotFoundWrapper>
);

export default PageNotFound;
