import React from 'react';
import PropTypes from 'prop-types';
import ScrollToTop from '../helpers/ScrollToTop';

import ContentWrapper from './ContentWrapper';
import PageHeader from './PageHeader';
import Routes from './Routes';

const Page = ({ setTheme }) => (
	<>
		<PageHeader />
		<ContentWrapper>
			<ScrollToTop>
				<Routes />
			</ScrollToTop>
		</ContentWrapper>
	</>
);

Page.propTypes = {
	setTheme: PropTypes.func.isRequired,
};

export default Page;
