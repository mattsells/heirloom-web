import { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

import * as Frame from '@/components/Frame';
import { Recipe } from '@/types/recipe';
import { Radius } from '@/variables/borders';
import { Slate } from '@/variables/colors';
import { Size } from '@/variables/fonts';
import { Shadow } from '@/variables/shadows';
import { Space } from '@/variables/space';
import { Speed } from '@/variables/transitions';

type Props = {
	recipe: Recipe;
};

const useStyles = createUseStyles({
	root: {
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

	content: {
		backgroundImage: (recipe: Recipe) =>
			`url(http://localhost:3000${recipe.coverImageUrl})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
		backgroundRepeat: 'no-repeat',
		height: '100%',
	},

	name: {
		fontSize: Size.regular,
		color: Slate.dark,
	},

	veil: {
		alignItems: 'flex-end',
		// TODO: Move RGB color to variable (tangerine regular)
		backgroundColor: `rgba(255, 255, 255, 0.5)`,
		display: 'flex',
		height: '100%',
		padding: Space.regular,
	},
});

function Card({ recipe }: Props): ReactElement<Props> {
	const classes = useStyles(recipe as any);

	// TODO: Create routing util
	return (
		<Link className={classes.root} to={`/recipes/${recipe.id}`}>
			<Frame.Square>
				<div className={classes.content}>
					<div className={classes.veil}>
						<h4 className={classes.name}>{recipe.name}</h4>
					</div>
				</div>
			</Frame.Square>
		</Link>
	);
}

export default Card;