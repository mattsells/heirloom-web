import { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

import * as Frame from '@/components/Frame';
import { Recipe } from '@/types/recipe';

type Props = {
	recipe: Recipe;
};

const useStyles = createUseStyles({
	root: {
		backgroundColor: 'red',
		display: 'block',
	},
});

function Card({ recipe }: Props): ReactElement<Props> {
	const classes = useStyles();

	// TODO: Create routing util
	return (
		<Link className={classes.root} to={`/recipes/${recipe.id}`}>
			<Frame.Square>{recipe.name}</Frame.Square>
		</Link>
	);
}

export default Card;
