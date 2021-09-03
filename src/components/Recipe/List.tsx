import { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Space } from '@/variables/space';
import { Recipe } from '@/types/recipe';

import Card from './Card';

type Props = {
	isLoading: boolean;
	recipes: Recipe[];
};

const useStyles = createUseStyles({
	root: {
		display: 'grid',
		gap: Space.regular,
		// TODO: Change grid size for media queries
		gridTemplateColumns: 'repeat(5, 1fr)',
	},
});

function List({ isLoading, recipes = [] }: Props): ReactElement<Props> {
	const classes = useStyles();

	// TODO: Add loading indicator
	if (isLoading) {
		return <h1>LOADING</h1>;
	}

	// TODO: Create empty state
	if (!recipes.length) {
		return <h1>NO RECIPES</h1>;
	}

	return (
		<div className={classes.root}>
			{recipes.map((recipe) => (
				<Card recipe={recipe} />
			))}
		</div>
	);
}

export default List;
