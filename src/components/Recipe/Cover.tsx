import { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import * as Frame from '@/components/Frame';
import * as Text from '@/components/Text';
import { Recipe } from '@/types/recipe';

type Props = {
	recipe: Recipe;
};

const useStyles = createUseStyles({
	cover: {
		alignItems: 'flex-end',
		// TODO: Get correct URL for image
		backgroundImage: ({ recipe }: Props) =>
			`url(http://localhost:3000${recipe.coverImageUrl})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
		backgroundRepeat: 'no-repeat',
		display: 'flex',
		height: '100%',
	},
});

function Cover({ recipe }: Props): ReactElement<Props> {
	const classes = useStyles({ recipe } as any);

	if (!recipe.coverImageUrl) {
		return <Text.Header>{recipe.name}</Text.Header>;
	}

	return (
		<Frame.Ratio ratio={0.35}>
			<div className={classes.cover}>
				<Text.Header>{recipe.name}</Text.Header>
			</div>
		</Frame.Ratio>
	);
}

export default Cover;