import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Input from './Input';

const IpInput = ({ ...props }) => {
	const [hasError, setHasError] = useState(false);

	/**
	 * ipValidation
	 *
	 * @param {string} value
	 * @returns {bool}
	 */
	const ipValidation = value => {
		if (value === '') return true;

		return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
			value
		);
	};

	return <Input {...props} hasError={hasError} onBlur={() => setHasError(!ipValidation(props.value))} />;
};

IpInput.propTypes = {
	value: PropTypes.string,
};

export default IpInput;
