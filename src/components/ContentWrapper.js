import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

const StyledWrapper = styled.div`
	height: 100%;
	margin: 0 auto;
	padding: 70px 50px 25px;
	position: relative;
	text-align: left;

	@media print {
		margin-left: 0 !important;
		padding-top: 25px !important;
	}
`;

const ContentWrapper = props => <StyledWrapper className="ContentWrapper">{props.children}</StyledWrapper>;

ContentWrapper.propTypes = {
	children: PropTypes.node,
};

export default withTheme(ContentWrapper);
