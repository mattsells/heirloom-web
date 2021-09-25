/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import List, { Props } from '../List';

const mockOnBlur = jest.fn();
const mockOnChange = jest.fn();

const props: Props = {
	name: 'list',
	onBlur: mockOnBlur,
	onChange: mockOnChange,
	values: ['Value 1', 'Value 2'],
};

describe('<List />', () => {
	it.each([['Value 1'], ['Value 2']])(
		'renders an input with the value %s',
		(inputValue) => {
			render(<List {...props} />);
			expect(screen.getByDisplayValue(inputValue)).toBeInTheDocument();
		}
	);

	it('renders an additional input for a new item', () => {
		render(<List {...props} />);
		expect(screen.getByDisplayValue('')).toBeInTheDocument();
	});
});
