import { Story } from './story';

export type Recipe = {
	id: number;
	accountId: number;
	coverImageData: object;
	coverImageUrlSmall: string;
	coverImageUrlMedium: string;
	coverImageUrlLarge: string;
	directions: string[];
	ingredients: string[];
	name: string;

	stories?: Story[];
};
