import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const ToolbarButton = styled.div`
	position: relative;
`;

const Button = styled.button`
	/* button styles here */

	${props =>
		props.isHighlighted &&
		css`
			/* css when highlighted */
		`}

	${props =>
		props.showIcon &&
		css`
			/* css to show icon, probably in a :before or :after */
		`}
`;

const ToolbarButton = ({ type, onClick = () => null }) => {
	const [isHighlighted, setIsHighlighted] = useState(false);
	const [showSubmenu, setShowSubmenu] = useState(false);
	const [showIcon, setShowIcon] = useState(false);

	const onButtonClick = () => {
		if (type === 'toggle') {
			setIsHighlighted(!isHighlighted);
		} else if (type === 'select') {
			setShowIcon(true);
			setShowSubmenu(true);
		} else if (type === 'palette') {
			setIsHighlighted(isHighlighted);
			setShowSubmenu(true);
		}

		// call custom onClick if provided
		onClick();
	};

	return (
		<ToolbarButtonWrapper>
			<Button onClick={() => onButtonClick()} isHighlighted={isHighlighted} showIcon={showIcon} />
			{showSubmenu && <Submenu />}
		</ToolbarButtonWrapper>
	);
};

ToolbarButton.propTypes = {
	type: PropTypes.oneOf(['toggle', 'select', 'palette']).isRequired,
	onClick: PropTypes.func,
};

export default ToolbarButton;
