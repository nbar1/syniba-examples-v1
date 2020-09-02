function getWidget(reportId) {
	switch (reportId) {
		case 'abc001':
			return {
				metadata: {
					title: 'At A Glance',
					subTitle: 'Visits & Transactions by users',
					component: 'AtAGlance',
					reportId: 'abc001',
					duration: '1w',
					autoUpdate: 600,
				},
				data: {
					columns: [
						{
							title: 'Privileged',
							value: 2938,
							arrowDirection: 'up',
							description: {
								title: '+ .42%',
								subtitle: 'More users',
								inline: true,
							},
						},
						{
							title: 'Non-Privileged',
							value: 262,
							arrowDirection: 'rising',
							description: {
								title: '+ .01%',
								subtitle: 'Average audience',
								inline: true,
							},
						},
						{
							title: 'Transactions',
							value: 12345,
							arrowDirection: 'falling',
							description: {
								title: '+ .04%',
								subtitle: 'Less transactions by Transaction code',
								inline: true,
							},
						},
					],
				},
			};

		case 'abc002':
			return {
				metadata: {
					title: 'Locations of Transactions',
					component: 'Map',
					reportId: 'abc002',
					duration: '1m',
				},
				data: {
					highlighted: ['USA', 'GBR', 'IND'],
				},
			};

		case 'abc003':
			return {
				metadata: {
					title: 'IPs of most frequent transactons',
					component: 'Table',
					reportId: 'abc003',
					duration: '1d',
				},
				data: {
					rows: [
						{
							'IP Address': '71.272.177.228',
							Location: 'Bullevue, WA',
							Count: 1234,
						},
						{
							'IP Address': '216.58.218.164',
							Location: 'Plano, TX',
							Count: 1233,
						},
						{
							'IP Address': '172.168.10.1',
							Location: 'New Delhi, India',
							Count: 876,
						},
						{
							'IP Address': '192.168.23.98',
							Location: 'Midland, England',
							Count: 745,
						},
						{
							'IP Address': '176.16.254.11',
							Location: 'Gothenburg, Sweden',
							Count: 704,
						},
						{
							'IP Address': '256.254.17.09',
							Location: 'Washington, DC',
							Count: 654,
						},
						{
							'IP Address': '69.89.41.112',
							Location: 'Rancho Santa Margarita, CA',
							Count: 333,
						},
						{
							'IP Address': '127.45.98.00',
							Location: 'San Jose, CA',
							Count: 104,
						},
						{
							'IP Address': '176.16.254.11',
							Location: 'Gothenburg, Sweden',
							Count: 704,
						},
						{
							'IP Address': '256.254.17.09',
							Location: 'Washington, DC',
							Count: 654,
						},
						{
							'IP Address': '69.89.41.112',
							Location: 'Rancho Santa Margarita, CA',
							Count: 333,
						},
						{
							'IP Address': '127.45.98.00',
							Location: 'San Jose, CA',
							Count: 104,
						},
					],
				},
			};
		case 'abc004':
			return {
				metadata: {
					title: 'Access Status count by TCodes',
					component: 'BarChart',
					reportId: 'abc004',
					duration: '1d',
					chart: {
						layout: 'horizontal',
						xAxisKey: [{ key: 'name' }],
						yAxisKey: [{ key: 'pv' }],
					},
				},
				data: {
					chart: [
						{ name: 'T', pv: 4300, amt: 2100, color: '#5088ed' },
						{ name: 'U', pv: 3800, amt: 2500, color: '#5088ed' },
						{ name: 'V', pv: 4800, amt: 2181, color: '#5088ed' },
						{ name: 'W', pv: 3908, amt: 2000, color: '#5088ed' },
						{ name: 'X', pv: 9800, amt: 2290, color: '#f00' },
						{ name: 'Y', pv: 1398, amt: 2210, color: '#5088ed' },
						{ name: 'Z', pv: 2400, amt: 2400, color: '#5088ed' },
					],
				},
			};

		case 'abc005':
			return {
				metadata: {
					title: 'Trends & Anomalies within User Groups',
					component: 'LineChart',
					reportId: 'abc005',
					duration: '1d',
					chart: {
						xAxisKey: [{ key: 'name' }],
						yAxisKey: [
							{
								key: 'pv',
								color: '#f00',
							},
							{
								key: 'uv',
								color: '#ff0',
							},
						],
					},
				},
				data: {
					chart: [
						{ name: 'A', pv: 2400, uv: 342, amt: 2400 },
						{ name: 'B', pv: 1398, uv: 325, amt: 2210 },
						{ name: 'C', pv: 9800, uv: 765, amt: 2290 },
						{ name: 'D', pv: 3908, uv: 3243, amt: 2000 },
						{ name: 'E', pv: 4800, uv: 1232, amt: 2181 },
						{ name: 'F', pv: 3800, uv: 6332, amt: 2500 },
						{ name: 'G', pv: 4300, uv: 343, amt: 2100 },
					],
				},
			};

		case 'abc006':
			return {
				metadata: {
					title: 'Random Pie Chart',
					component: 'PieChart',
					reportId: 'abc006',
					duration: '1d',
				},
				data: {
					chart: [
						{ name: 'Group A', value: 400, color: '#f00' },
						{ name: 'Group B', value: 300, color: '#ff0' },
						{ name: 'Group C', value: 300, color: '#fff' },
						{ name: 'Group D', value: 200, color: '#0ff' },
						{ name: 'Group E', value: 278, color: '#00f' },
						{ name: 'Group F', value: 189, color: '#000' },
					],
				},
			};

		case 'abc007':
			return {
				metadata: {
					title: 'Random Pie Chart 2',
					component: 'PieChart',
					reportId: 'abc007',
					duration: '1d',
				},
				data: {
					chart: [
						{ name: 'Group A', value: 400, color: '#f00' },
						{ name: 'Group B', value: 300, color: '#ff0' },
						{ name: 'Group C', value: 300, color: '#fff' },
						{ name: 'Group D', value: 200, color: '#0ff' },
						{ name: 'Group E', value: 278, color: '#00f' },
						{ name: 'Group F', value: 189, color: '#000' },
					],
				},
			};
		default:
			return null;
	}
}

module.exports = getWidget;
