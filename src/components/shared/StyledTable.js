import styled, { css } from 'styled-components';

export default styled.table`
	background: ${props => props.theme.table.background};
	border-radius: 2px;
	border-spacing: 0;
	border: none;
	color: ${props => props.theme.table.text};
	font-family: 'Archivo', sans-serif;
	font-size: 15px;
	line-height: 30px;
	margin: 10px 0 20px;
	width: 100%;
	border-collapse: collapse;

	td,
	th {
		background-color: ${props => props.theme.table.background};
		border-bottom: ${props => props.theme.table.border};
		border-left: ${props => props.theme.table.border};
		border-right: none;
		border-top: none;
		cursor: pointer;
		line-height: 30px;
		padding: 15px 25px;
		position: relative;

		:last-child {
			border-right: ${props => props.theme.table.border};
		}
	}

	th {
		border-bottom: 1px solid ${props => props.theme.neutralDarkest};
		border-top: ${props => props.theme.table.border};
		color: ${props => props.theme.table.headerTextColor};
		outline: none;
		position: sticky;
		text-align: left;
		top: 156px;
		z-index: 20;

		${props =>
			props.showQuickFilters &&
			css`
				top: 434px;
			`}

		${props =>
			props.showActivitiesGraph &&
			css`
				top: 461px;
			`}

		${props =>
			props.showActivitiesGraph &&
			props.showQuickFilters &&
			css`
				top: 729px;
			`}
	}

	th:last-child {
		overflow: visible;
	}

	tbody > tr > td {
		:first-child {
			width: 20px;
		}
	}

	tbody tr:hover {
		color: ${props => props.theme.table.highlightTextColor};

		td {
			background-color: ${props => props.theme.table.rowHoverBackgroundColor};
		}

		td:hover {
			background-color: ${props => props.theme.table.cellHoverBackgroundColor};
		}
	}

	tbody {
		border-bottom: 1px solid #23252c;
	}
`;
