import React from 'react';
import styled, { css } from 'styled-components';

const StyledSkeletonLine = styled.div`
	animation: pulse 1.2s ease-in-out infinite;
	background: linear-gradient(
		-90deg,
		${props => props.theme.loader.skeleton.color1} 0%,
		${props => props.theme.loader.skeleton.color2} 50%,
		${props => props.theme.loader.skeleton.color1} 100%
	);
	background-size: 400% 400%;
	border-radius: 5px;
	display: inline-block;
	height: ${props => (props.height ? props.height : css`inherit`)};
	vertical-align: middle;
	width: ${props => (props.width ? props.width : css`100%`)};

	@keyframes pulse {
		0% {
			background-position: 0% 0%;
		}
		100% {
			background-position: -135% 0%;
		}
	}
`;

const SkeletonLine = props => (
	<StyledSkeletonLine data-testid="SkeletonLine" {...props}>
		&nbsp;
	</StyledSkeletonLine>
);

export default SkeletonLine;
