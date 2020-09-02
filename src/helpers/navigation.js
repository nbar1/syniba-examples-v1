const navigation = [
	{
		title: 'Dashboard',
		to: '/dashboard',
		useTooltip: true,
	},
	{
		title: 'Scrolling Table',
		to: '/scrolling-table',
		useTooltip: true,
	},
];

const getRouteIndex = pathname => {
	let routeIndex = -1;

	if (typeof pathname === String) return -1;

	navigation.filter((route, i) => {
		if (pathname.toString().indexOf(route.to) === 0) {
			routeIndex = i;
			return true;
		}

		return false;
	});

	return routeIndex;
};

export { navigation, getRouteIndex };
