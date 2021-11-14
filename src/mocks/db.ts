import { factory, primaryKey } from '@mswjs/data';

export const db = factory({
	recipe: {
		id: primaryKey(Number),
		accountId: Number,
		coverImageData: Object,
		coverImageUrlSmall: Object,
		coverImageUrlMedium: Object,
		coverImageUrlLarge: Object,
		directions: Array,
		ingredients: Array,
		name: String,
	},
});
