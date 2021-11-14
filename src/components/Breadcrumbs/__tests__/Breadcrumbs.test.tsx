/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import Breadcrumbs, { BreadcrumbsPath } from '..';

describe('<Breadcrumbs />', () => {
	beforeEach(() => {
		const breadcrumbs: BreadcrumbsPath = [
			{
				label: 'Label 1',
				path: '/path1',
			},
			{
				label: 'Label 2',
			},
			{
				label: 'Label 3',
				path: '/path3',
			},
		];

		render(
			<MemoryRouter>
				<Breadcrumbs path={breadcrumbs} />
			</MemoryRouter>
		);
	});

	it.each([['Label 1'], ['Label 3']])('renders %s as a link', (name) => {
		expect(screen.getByRole('link', { name })).toBeInTheDocument();
	});

	it('renders the label text for every breadcrumb', () => {
		expect(
			screen.queryByRole('link', { name: 'Label 2' })
		).not.toBeInTheDocument();
	});
});
