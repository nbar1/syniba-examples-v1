import React, { useState } from 'react';
import Input from './Input';
import ActionButton from '../ActionButton';

const MultipleInputs = () => {
	const [inputValues, setInputValues] = useState(['']);

	/**
	 * inputValueChanged
	 *
	 * @param {string} value
	 * @param {number} index
	 * @returns {void}
	 */
	const inputValueChanged = (value, index) => {
		let newValues = [...inputValues];
		newValues[index] = value;
		setInputValues(newValues);
	};

	/**
	 * inputValueChanged
	 *
	 * @param {string} value
	 * @param {number} index
	 * @returns {void}
	 */
	const addRow = () => {
		let newValues = [...inputValues];
		newValues.push('');
		setInputValues(newValues);
	};

	return (
		<div>
			{inputValues.map((value, i) => {
				return (
					<Input
						label={`Email Address ${i}`}
						value={value}
						onChange={node => inputValueChanged(node.value, i)}
						key={i}
					/>
				);
			})}
			<ActionButton onClick={addRow}>add row</ActionButton>
		</div>
	);
};

export default MultipleInputs;
