/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router';

import routes from '@/api/routes';
import ApiContext from '@/context/api';
import { HttpClient } from '@/lib/http';

import List from '../List';

const api = new HttpClient(routes);
const file = new File(['test'], 'test.jpeg', { type: 'image/jpeg' });

jest.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string) => key,
	}),
}));

describe('<List />', () => {
	beforeEach(() => {
		render(
			<QueryClientProvider client={new QueryClient()}>
				<MemoryRouter>
					<ApiContext.Provider value={api}>
						<List />
					</ApiContext.Provider>
				</MemoryRouter>
			</QueryClientProvider>
		);
	});

	it('creates a new recipe', async () => {
		// Open recipe form
		userEvent.click(screen.getByLabelText('recipes.add'));

		// Add to fields
		userEvent.upload(screen.getByTestId('image-input'), file);

		// Background of image input changes after response is returned
		await waitFor(() => {
			expect(screen.getByTestId('input-image-display')).toHaveStyle({
				display: 'none',
			});
		});

		// TODO: Add handling for list inputs
		// TODO: Fix form inputs and Formik warnings
		// await act(() => {
		// 	userEvent.type(screen.getByLabelText('recipe.name'), 'New Recipe');

		// 	userEvent.click(
		// 		screen.getAllByRole('button', { name: 'recipes.add' })[0]
		// 	);
		// });

		// TODO: Move this to full app test to test URL changes
	});
});
