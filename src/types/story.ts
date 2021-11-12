export type ContentType = 'image' | 'video';
export type StoryType = 'artifact' | 'direction' | 'memory';

export type Story = {
	id: number;
	accountId: number;
	contentType: ContentType;
	description: string;
	imageUrlSmall: string;
	imageUrlMedium: string;
	imageUrlLarge: string;
	name: string;
	storyType: StoryType;
	videoUrl: string;
};
