// TODO: Change how this works

import { parseFileData } from '@/utils/file';

export type CreateRecipeBodyParams = {
	accountId: number;
	coverImage: string;
	directions: string[];
	ingredients: string[];
	name: string;
};

export function createRecipeBody({
	coverImage,
	...fields
}: CreateRecipeBodyParams): object {
	return {
		recipe: {
			coverImage: parseFileData(coverImage),
			...fields,
		},
	};
}
