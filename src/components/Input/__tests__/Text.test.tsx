/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tangerine } from '@/variables/colors';

import Text from '../Text';

describe('<Text />', () => {
	const mockOnChange = jest.fn();

	it('renders a text input', () => {
		render(<Text onChange={mockOnChange} />);

		expect(screen.getByRole('textbox')).toBeInTheDocument();
	});

	it('displays as an error if one is provided', () => {
		render(<Text error="Required" onChange={mockOnChange} />);

		expect(screen.getByRole('textbox')).toHaveStyle({
			background: Tangerine.lightest,
			borderColor: Tangerine.dark,
		});
	});

	it('triggers the onChange event', () => {
		render(<Text onChange={mockOnChange} />);

		userEvent.type(screen.getByRole('textbox'), 'value');

		expect(mockOnChange).toHaveBeenCalledTimes(5);
	});
});
