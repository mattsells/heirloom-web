import { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import * as Frame from '@/components/Frame';
import { Story } from '@/types/story';
import { Radius, Shadow, Speed } from '@/variables';

type Props = {
	story: Story;
};

const useStyles = createUseStyles(
	{
		root: {
			border: 'none',
			borderRadius: Radius.narrow,
			boxShadow: Shadow.lightest,
			display: 'block',
			overflow: 'hidden',
			transform: 'scale(0.98)',
			transition: `transform ${Speed.regular} linear, box-shadow ${Speed.regular} linear`,

			'&:hover': {
				boxShadow: Shadow.light,
				transform: 'scale(1.0)',
			},
		},

		image: {
			height: '100%',
			objectFit: 'cover',
			width: '100%',
		},
	},
	{ name: 'StoryCard' }
);

function Card({ story }: Props): ReactElement<Props> {
	const classes = useStyles(story as any);

	return (
		<a className={classes.root} href={`http://localhost:3000${story.imageUrl}`}>
			<Frame.Square>
				<img
					alt={story.name}
					className={classes.image}
					src={`http://localhost:3000${story.imageUrl}`}
				/>
			</Frame.Square>
		</a>
	);
}

export default Card;
