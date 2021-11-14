import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { BiPlusMedical } from 'react-icons/bi';
import { createUseStyles } from 'react-jss';

import * as Button from '@/components/Button';
import * as Loading from '@/components/Loading';
import { Recipe } from '@/types/recipe';
import { Forest } from '@/variables/colors';
import { Size } from '@/variables/fonts';
import { Space } from '@/variables/space';

import Card from './Card';

type Props = {
	isLoading: boolean;
	onClickAddRecipe: VoidFunction;
	recipes: Recipe[];
};

const useStyles = createUseStyles(
	{
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
	},
	{ name: 'RecipeList' }
);

function List({
	isLoading,
	onClickAddRecipe,
	recipes = [],
}: Props): ReactElement<Props> {
	const classes = useStyles();
	const { t } = useTranslation();

	if (isLoading) {
		return <Loading.Placeholder text={t('recipes.loading')} />;
	}

	return (
		<div className={classes.root}>
			<Button.Square id="add-recipe-tile" onClick={onClickAddRecipe}>
				<div className={classes.add}>
					<BiPlusMedical />
					<label className={classes.addText} htmlFor="add-recipe-tile">
						{t('recipes.add')}
					</label>
				</div>
			</Button.Square>

			{recipes.map((recipe) => (
				<Card key={recipe.id} recipe={recipe} />
			))}
		</div>
	);
}

export default List;
