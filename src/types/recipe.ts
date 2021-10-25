import { Story } from './story';

export type Recipe = {
	id: number;
	accountId: number;
	coverImageData: object;
	coverImageUrl: string;
	directions: string[];
	ingredients: string[];
	name: string;

	stories?: Story[];
};
