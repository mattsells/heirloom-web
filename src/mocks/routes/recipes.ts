import { rest } from 'msw';

import { RecipeBodyParams } from '@/api/utils/recipes';

import { db } from '../db';

const handlers = [
	rest.get('/v1/recipes', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json([]));
	}),

	rest.post<{ recipe: RecipeBodyParams }>('/v1/recipes', (req, res, ctx) => {
		const recipe = db.recipe.create({
			accountId: req.body.recipe.accountId,
			coverImageData: {},
			coverImageUrlSmall: 'https://www.example.com/image.jpg',
			coverImageUrlMedium: 'https://www.example.com/image.jpg',
			coverImageUrlLarge: 'https://www.example.com/image.jpg',
			directions: [],
			ingredients: [],
			name: req.body.recipe.name,
		});

		return res(ctx.status(201), ctx.json(recipe));
	}),
];

export default handlers;
