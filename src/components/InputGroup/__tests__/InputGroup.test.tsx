/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputGroup, { Props } from '../InputGroup';

const mockOnChange = jest.fn();

const errorText = 'Field is required';

const props: Props = {
	label: 'Password',
	onChange: mockOnChange,
};

describe('<InputGroup />', () => {
	it('triggers the onChange event', () => {
		render(<InputGroup {...props} />);

		const input = screen.getByLabelText('Password');

		userEvent.type(input, 'password');

		expect(mockOnChange).toHaveBeenCalledTimes(8);
	});

	it('does not render an error message unless the field is touched', () => {
		render(<InputGroup {...props} error={errorText} />);

		expect(screen.queryByText(errorText)).not.toBeInTheDocument();
	});

	it('renders an error message', () => {
		render(<InputGroup {...props} touched error={errorText} />);

		expect(screen.getByText(errorText)).toBeInTheDocument();
	});
});
