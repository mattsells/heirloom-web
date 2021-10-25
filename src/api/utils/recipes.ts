// TODO: Change how this works

import { parseFileData } from '@/utils/file';

export type RecipeBodyParams = {
	accountId: number;
	coverImage: string;
	directions: string[];
	ingredients: string[];
	name: string;
};

export function recipeBody({
	coverImage,
	...fields
}: RecipeBodyParams): object {
	return {
		recipe: {
			coverImage: parseFileData(coverImage),
			...fields,
		},
	};
}
