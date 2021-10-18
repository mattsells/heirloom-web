import { Story } from './story';

export type Recipe = {
	id: number;
	accountId: number;
	coverImageUrl: string;
	directions: string[];
	ingredients: string[];
	name: string;

	stories?: Story[];
};
