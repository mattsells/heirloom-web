import { rest } from 'msw';

import { FileUploadResponse } from '@/types/file';

const handlers = [
	// TODO: Make this only require path, not full URL
	rest.post('http://localhost:3000/upload', (req, res, ctx) => {
		const file: FileUploadResponse = {
			// TODO: Turn into factory
			data: {
				id: '1',
				storage: 'cache',
				metadata: {
					filename: 'test.jpeg',
					mime_type: 'image/jpeg',
					size: 0,
				},
			},
			url: 'https://www.example.com/test.jpeg',
		};

		return res(ctx.status(201), ctx.json(file));
	}),
];

export default handlers;
