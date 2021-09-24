/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';

import { ApiContext } from '@/context';

import Registration from '../Registration';

const mockPost = jest.fn();

const httpClientMock = { create: mockPost };

describe('<Registration />', () => {
	beforeEach(() => {
		render(
			<MemoryRouter>
				{/* @ts-ignore */}
				<ApiContext.Provider value={httpClientMock}>
					<Registration />
				</ApiContext.Provider>
			</MemoryRouter>
		);
	});

	it('creates a new user with valid params', async () => {
		const emailInput = screen.getByLabelText('fields.email');
		const passwordInput = screen.getByLabelText('fields.password');
		const passwordConfirmationInput = screen.getByLabelText(
			'fields.passwordConfirmation'
		);

		userEvent.type(emailInput, 'user+1@example.com');
		userEvent.type(passwordInput, 'password');
		userEvent.type(passwordConfirmationInput, 'password');

		const submitButton = screen.getByRole('button');

		await waitFor(() => expect(submitButton).not.toBeDisabled());

		userEvent.click(submitButton);

		await waitFor(() => expect(mockPost).toHaveBeenCalled());
	});
});
