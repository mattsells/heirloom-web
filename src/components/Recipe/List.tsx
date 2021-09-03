import { ReactElement } from 'react';
import { BiPlusMedical } from 'react-icons/bi';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';

import * as Button from '@/components/Button';
import { Recipe } from '@/types/recipe';
import { Forest } from '@/variables/colors';
import { Size } from '@/variables/fonts';
import { Space } from '@/variables/space';

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

	add: {
		alignItems: 'center',
		color: Forest.light,
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		justifyContent: 'center',

		'& > svg': {
			fontSize: Size.giant,
			marginBottom: Space.thin,
		},
	},

	addText: {
		fontSize: Size.regular,
	},
});

function List({ isLoading, recipes = [] }: Props): ReactElement<Props> {
	const classes = useStyles();
	const { t } = useTranslation();

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

			<Button.Square>
				<div className={classes.add}>
					<BiPlusMedical />
					<span className={classes.addText}>{t('recipes.add')}</span>
				</div>
			</Button.Square>
		</div>
	);
}

export default List;
