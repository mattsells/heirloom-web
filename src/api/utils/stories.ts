// TODO: Change how this works

import { ContentType, StoryType } from '@/types/story';
import { parseFileData } from '@/utils/file';

export type CreateStoryBodyParams = {
	accountId: number;
	contentType: ContentType;
	image: string;
	description: string;
	name: string;
	recipeIds: number[];
	storyType: StoryType;
};

export function createStoryBody({
	image,
	...fields
}: CreateStoryBodyParams): object {
	return {
		story: {
			image: parseFileData(image),
			...fields,
		},
	};
}
