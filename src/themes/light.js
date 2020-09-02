import defaultTheme from './default';
import merge from 'deepmerge';

const neutralDarkest = '#23252c';
const neutralDarker = '#383a3f';
const neutralLighter = '#ABABAC';

const errorColor = '#a71b1b';
const errorColorLight = '#d62929';

export default merge(defaultTheme, {
	backgroundColor: '#DBDCE1',
	layout: {
		sidebar: {
			backgroundColor: '#FFF',
			footerBackgroundColor: '#FFF',
			footerSeparator: '#DBDCE1',
			toggleColor: '#202125',
			submenuTextColor: '#949496',
		},
	},
	navigation: {
		toolTip: {
			background: '#fff',
			border: '1px solid #aaa',
			boxShadow: '#666 0px 4px 12px',
			color: '#000',
		},
		header: {
			link: '#7d7c7c',
			activeLink: '#4c4c4c',
		},
	},
	elements: {
		moduleBackground: '#fff',
		moduleBorder: '1px solid #4D4C50',
		moduleText: '#000',
	},
	formFields: {
		inputTextColor: '#202125',
		inputPlaceholderColor: '#202125',
		inputIconColor: '#202125',
	},
	notifications: {
		background: '#f5f5f5',
		backgroundHover: '#e4e4e4',
		title: '#000',
		subtitle: '#525252',
		border: '#b3b3b3',
	},
	dashboard: {
		columns: 3,
		rowHeight: 200,
		component: {
			background: '#f5f5f5',
			borderColor: '#ababab',
			borderRadius: '4px',
			boxShadow: '0px 2px 5px 0px rgba(0, 0, 0, 0.5)',
			titleColor: '#525252',
			viewReportHoverColor: '#545454',
			chart: {
				legendColor: '#808186',
			},
			map: {
				defaultColor: '#d6d6d6',
				selectedColor: '#4286f5',
			},
			durationSelection: {
				popup: {
					color: '#808186',
					activeColor: '#000',
					menuColor: '#f5f5f5',
				},
				inline: {
					color: '#808186',
					activeColor: '#000',
				},
			},
			menu: {
				color: '#808186',
				activeColor: '#000',
				menuColor: '#f5f5f5',
			},
		},
	},
	queryBox: {
		addButtonHover: '#e8e8e8',
	},
	filter: {
		titleColor: '#fff',
		background: '#4285F4',
		backgroundAlt: '#3f72c3',
		textColor: '#fff',
		textColorAlt: '#fff',
		bubbleCounterBackground: '#294780',
		pillBackground: '#3666b3',
		savedIconBackground: '#a9c8f9',
	},
	filterColumns: {
		backgroundColor: '#fff',
		unselectedTextColor: '#5C5C5C',
		accentColor: '#000',
		columnSelectionBorderColor: '#CECECE',
		borderColor: '#C2C2C2',
	},
	table: {
		background: '#fff',
		border: '1px solid' + neutralLighter,
		cellHoverBackgroundColor: '#B2D5FF',
		dateTimeTextColor: neutralDarkest,
		headerTextColor: '#40434a',
		highlightTextColor: '#000000',
		rowHoverBackgroundColor: '#EFF3FF',
		text: neutralDarkest,
	},
	drawer: {
		backgroundColor: '#fff',
		closeButtonColor: '#5e5e5d',
		mainTextColor: '#5c5c5c',
	},
	modal: {
		backgroundColor: '#fbfbfb',
		opacity: 0.94,
		maskColor: '#67686b',
		maskOpacity: 0.6,
		boxShadow: '0px 0px 10px #151313',
		titleColor: '#464646',
		closeButtonColor: '#5e5e5d',
		closeButtonHoverColor: '#707071',
	},
	alert: {
		textColor: neutralDarker,
		countTextColor: neutralDarker,
	},
	graph: {
		bar: {
			color: '#ffffff',
		},
	},
	loader: {
		skeleton: {
			color1: '#d8d8d8',
			color2: '#b9b9b9',
		},
	},
	input: {
		background: '#ececec',
		labelColor: '#70737c',
		textColor: '#3e3e3e',
		border: '1px solid #bdbdbd',
		errorBorder: `1px solid ${errorColor}`,
		errorBoxShadow: '0px 2px 10px 0px rgba(243,66,66, 0.4)',
		errorMessageColor: errorColorLight,
	},
});
