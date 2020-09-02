import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRoute from 'test-utils/renderWithRoute';

import Input from './Input';
afterEach(cleanup);

it('renders', () => {
	renderWithRoute(<Input label={'test input'} />);
});

it('renders with label', () => {
	const { queryByTestId } = renderWithRoute(<Input label={'test input'} />);

	expect(queryByTestId('Input-Label')).toHaveTextContent(/test input/i);
});

it('calls given onChange when value is changed', () => {
	const onChange = jest.fn(() => null);

	const { queryByTestId } = renderWithRoute(<Input label={'test input'} onChange={onChange} />);

	fireEvent.change(queryByTestId('Input'), { target: { value: 'test value' } });

	expect(onChange).toBeCalledTimes(1);
});

it('calls given onFocus when focused', () => {
	const onFocus = jest.fn(() => null);

	const { queryByTestId } = renderWithRoute(<Input label={'test input'} onFocus={onFocus} />);

	fireEvent.blur(queryByTestId('Input'));
	fireEvent.focus(queryByTestId('Input'));

	// TODO expect(onFocus).toBeCalledTimes(1);
});

it('calls given onBlur when blurred', () => {
	const onBlur = jest.fn(() => null);

	const { queryByTestId } = renderWithRoute(<Input label={'test input'} onBlur={onBlur} />);

	fireEvent.focus(queryByTestId('Input'));
	fireEvent.blur(queryByTestId('Input'));

	// TODO expect(onBlur).toBeCalledTimes(1);
});

it('clears when clear button is clicked', () => {
	const { queryByTestId } = renderWithRoute(<Input label={'test input'} clearable={true} value={'test value'} />);

	expect(queryByTestId('Input').value).toBe('test value');

	fireEvent.click(queryByTestId('Input-ClearInput'));

	// TODO not sure why this is failing here
	expect(queryByTestId('Input').value).toBe('');
});
