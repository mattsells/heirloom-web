/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Submit from '../Submit';

describe('<Submit>', () => {
	const mockOnClick = jest.fn();

	beforeEach(() => {
		render(<Submit onClick={mockOnClick} />);
	});

	it('renders a button of type "submit"', () => {
		expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
	});

	it('triggers the onClick handler', () => {
		userEvent.click(screen.getByRole('button'));

		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});
});
