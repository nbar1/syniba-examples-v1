import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PageNotFound from './PageNotFound';

//import Dashboard from './Dashboard';
//import ScrollingTable from './ScrollingTable';

const Dashboard = () => <div>Dashboard</div>;
const ScrollingTable = () => <div>Scrolling Table</div>;

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/" component={() => <Redirect to="/dashboard" />} />
			<Route exact path="/dashboard" component={() => <Dashboard />} />
			<Route exact path="/scrolling-table" component={() => <ScrollingTable />} />
			<Route component={PageNotFound} />
		</Switch>
	);
};

Routes.propTypes = {};

export default Routes;
