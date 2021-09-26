/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Link from '../Link';

const mockOnClick = jest.fn();

describe('<Link />', () => {
	it('triggers the onClick event if provided', () => {
		render(
			<Link to="/example" onClick={mockOnClick}>
				Link
			</Link>
		);

		userEvent.click(screen.getByRole('link'));

		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});
});
