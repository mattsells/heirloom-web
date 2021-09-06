// TODO: Change how this works

type CreateRecipeBodyParams = {
	accountId: number;
	name: string;
};

export function createRecipeBody({
	accountId,
	name,
}: CreateRecipeBodyParams): object {
	return {
		recipe: {
			accountId,
			name,
		},
	};
}
