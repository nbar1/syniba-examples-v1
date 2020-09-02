/**
 * getAvailableWidgets
 */
function isSelected() {
	return Math.random() >= 0.5;
}

let availableWidgets = [
	{
		selected: isSelected(),
		title: 'Access Status by TCodes',
		description:
			"'Stacked' bar chart horizontal axis for TCODE to depict Access Status count by Transaction Codes - Denied (Yellow) vs. Granted (Green) over the timeseries.",
		exampleImage: '',
	},
	{
		selected: isSelected(),
		title: 'Top IPs of most frequent transactions',
		description:
			'This is a list... "IP Address", "Location", & transactions count decending sort by transaction count.',
		exampleImage: '',
	},
	{
		selected: isSelected(),
		title: 'Location of Transaction Codes on the map',
		description: 'Map displays the regions across the world with color intensity to depict the TCODE counts.',
		exampleImage: '',
	},
	{
		selected: isSelected(),
		title: 'Trends & Anamolies within User Groups',
		description: 'Map displays the regions across the world with color intensity to depict the TCODE counts.',
		exampleImage: '',
	},
];

function getAvailableWidgets() {
	return availableWidgets;
}

module.exports = getAvailableWidgets;
