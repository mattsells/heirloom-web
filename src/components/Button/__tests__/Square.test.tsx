/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Square from '../Square';

describe('<Square>', () => {
	const mockOnClick = jest.fn();

	beforeEach(() => {
		render(<Square onClick={mockOnClick} />);
	});

	it('renders a button', () => {
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('triggers the onClick handler', () => {
		userEvent.click(screen.getByRole('button'));

		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});
});
