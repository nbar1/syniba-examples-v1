/* eslint-disable no-inline-comments */
/* eslint-disable spaced-comment */

const primaryMuted = '#4285F4';
const primaryBright = '#0198C3';

const neutralDarkest = '#23252c';
const neutralDarker = '#383a3f';
const neutralDark = '#40434A';
const neutralLight = '#70737C';
const neutralLighter = '#ABABAC';
const neutralLightest = '#F8F9FA';

const secondaryBlue = '#2d5ba8';
const secondaryGreen = '#23c996';
const secondaryYellow = '#ffc517';
const secondaryOrange = '#f17704';
const secondaryRed = '#f34242';

const errorColor = '#a71b1b';
const errorColorLight = '#d62929';

export default {
	title: 'Syniba Analytics',
	primaryMuted,
	primaryBright,
	neutralDarkest,
	neutralDarker,
	neutralDark,
	neutralLight,
	neutralLighter,
	neutralLightest,
	secondaryBlue,
	secondaryGreen,
	secondaryYellow,
	secondaryOrange,
	secondaryRed,
	backgroundColor: neutralDarker,
	layout: {
		sidebar: {
			backgroundColor: neutralDarkest,
			footerBackgroundColor: neutralDarkest,
			footerSeparator: '#383841',
			logoWidth: '32px',
			width: '85px',
			submenuTextColor: '#fff',
		},
	},
	navigation: {
		markerColor: primaryMuted,
		iconColor: primaryMuted,
		labelColor: '#6C6E70',
		linkPadding: '16px 0',
		toolTip: {
			background: '#000',
			border: '0',
			boxShadow: '0',
			color: '#fff',
		},
		header: {
			link: '#7d8496',
			activeLink: '#fefefe',
		},
	},
	elements: {
		activeTextColor: '#fff',
		moduleBackground: '#41444a',
		moduleBorder: '1px solid #25262b',
	},
	state: {
		activeColor: primaryMuted,
	},
	activities: {
		color: neutralLight,
	},
	formFields: {
		miniSearchBorder: '1px solid #76a3fb',
		miniSearchPlaceholderColor: '#76a3fb',
		miniSearchTextColor: '#fff',
		inputTextColor: '#fff',
		inputPlaceholderColor: '#9595aa',
		inputIconColor: '#9595aa',
		buttonInactive: '#6c757d',
	},
	notifications: {
		background: '#484a50',
		backgroundHover: '#5c5e67',
		title: '#fff',
		subtitle: '#ababab',
		border: '#333333',
	},
	dashboard: {
		columns: 3,
		rowHeight: 200,
		component: {
			background: neutralDark,
			borderColor: '#3a3b40',
			borderRadius: '4px',
			boxShadow: '0px 2px 5px 0px rgba(0, 0, 0, 0.5)',
			titleColor: '#d0d1d3',
			viewReportHoverColor: '#c8c9cd',
			chart: {
				legendColor: '#808186',
			},
			map: {
				defaultColor: '#555e6d',
				selectedColor: '#4286f5',
			},
			durationSelection: {
				popup: {
					color: '#808186',
					activeColor: '#fff',
					menuColor: '#484a50',
				},
				inline: {
					color: '#808186',
					activeColor: '#fff',
				},
			},
			menu: {
				color: '#808186',
				activeColor: '#fff',
				menuColor: '#484a50',
			},
		},
	},
	queryBox: {
		addButtonHover: '#4d4f54',
	},
	quickFilters: {
		background: primaryMuted,
		textColor: '#fff',
	},
	filter: {
		background: '#5f5f5f',
		backgroundAlt: '#777',
		backgroundSave: secondaryBlue,
		bubbleCounterBackground: '#294780',
		pillBackground: '#3666b3',
		savedIconBackground: '#a9c8f9',
		textColor: '#fff',
		textColorAlt: '#000',
		titleColor: '#fff',
	},
	filterColumns: {
		backgroundColor: '#26252a',
		unselectedTextColor: '#5d5c61',
		accentColor: '#fff',
		infoTextColor: '#68676a',
		columnSelectionBorderColor: '#68676a',
		toggleIconColor: '#26272c',
		borderColor: '#26252a',
	},
	table: {
		activeRowBorderColor: '#007BFF',
		background: '#41444a',
		border: '1px solid' + neutralDarker,
		cellHoverBackgroundColor: 'rgba(92, 94, 101, 0.5)',
		dateTimeTextColor: neutralLighter,
		headerTextColor: '#cacdd5',
		highlightTextColor: '#fff',
		rowHoverBackgroundColor: '#47484c',
		text: '#85878a',
	},
	drawer: {
		backgroundColor: '#222329',
		closeButtonColor: '#5e5e5d',
		mainTextColor: neutralLightest,
		fieldLabelColor: '#575b69',
		fieldValueColor: '#73798b',
		buttonColor: primaryMuted,
		spacerColor: '#3a3b40',
		opacity: 0.94,
	},
	modal: {
		backgroundColor: '#30353e',
		opacity: 0.94,
		maskColor: '#0c0d0f',
		maskOpacity: 0.6,
		boxShadow: '0px 0px 10px #151313',
		titleColor: '#c2c2c3',
		closeButtonColor: '#5e5e5d',
		closeButtonHoverColor: '#c2c2c3',
	},
	attachedPopup: {
		backgroundColor: '#0c0d0f',
		opacity: 0.94,
		spacerColor: '#3a3b40',
	},
	alert: {
		backgroundColor: secondaryRed,
		textColor: '#fff',
		countTextColor: '#fff',
		iconColor: '#fff',
	},
	graph: {
		bar: {
			color: '#212226',
			hover: primaryMuted,
		},
	},
	input: {
		background: '#40434a',
		labelColor: '#70737c',
		textColor: '#f8f9fa',
		border: '1px solid #27282d',
		errorBorder: `1px solid ${errorColor}`,
		errorBoxShadow: '0px 2px 10px 0px rgba(243,66,66, 0.4)',
		errorMessageColor: errorColorLight,
	},
	loader: {
		skeleton: {
			color1: '#41444a',
			color2: '#4f5358',
		},
	},
	button: {
		background: 'transparent',
		backgroundHover: '#4285F4',
		text: '#4285F4',
		textHover: '#F8F9FA',
	},
};
