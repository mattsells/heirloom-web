/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Image, { Props } from '../Image';

const mockOnChange = jest.fn();
const mockJson = jest.fn();
const mockFetch = jest.spyOn(global, 'fetch');

const props: Props = {
	onChange: mockOnChange,
	text: 'Add Image',
};

// TODO: Move to testing folder
const mockFile = new File(['hello'], 'hello.png', { type: 'image/png' });

const imageData = {
	url: '/test/upload',
	data: { id: 1 },
};

describe('<Image />', () => {
	it('emits the result of a file upload', async () => {
		mockFetch.mockResolvedValue({
			json: mockJson,
		} as unknown as Response);

		mockJson.mockResolvedValue(imageData);

		render(<Image {...props} />);

		const input = screen.getByTestId('file-input');

		userEvent.upload(input, mockFile);

		await waitFor(() => expect(mockOnChange).toHaveBeenCalled());
	});

	it('displays the image if data is provided', () => {
		render(<Image {...props} value={JSON.stringify(imageData)} />);

		expect(screen.getByTestId('image-input')).toHaveStyle({
			backgroundImage: `url(/test/upload)`,
		});
	});
});
