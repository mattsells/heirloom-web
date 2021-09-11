import { ReactElement, useMemo } from 'react';
import { BiPlusMedical } from 'react-icons/bi';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';

import * as Button from '@/components/Button';
import * as Loading from '@/components/Loading';
import * as Panel from '@/components/Panel';
import * as Text from '@/components/Text';
import { Recipe } from '@/types/recipe';
import { Forest } from '@/variables/colors';
import { Size } from '@/variables/fonts';
import { Space } from '@/variables/space';

import Cover from './Cover';

type Props = {
	isLoading: boolean;
	recipe: Recipe;
};

const useStyles = createUseStyles({
	root: {
		height: '100%',
	},

	list: {
		fontSize: Size.regular,
		paddingLeft: Space.wide,

		'& li': {
			'&:not(:last-child)': {
				marginBottom: Space.thin,
			},
		},
	},

	section: {
		marginBottom: Space.wide,
	},
});

function View({ isLoading, recipe }: Props): ReactElement<Props> {
	const classes = useStyles();
	const { t } = useTranslation();

	if (isLoading) {
		return <Loading.Placeholder text={t('recipe.loading')} />;
	}

	const ingredients = JSON.parse(recipe.ingredients);
	const directions = JSON.parse(recipe.directions);

	return (
		<div className={classes.root}>
			<Cover recipe={recipe} />

			<div className={classes.section}>
				<Panel.Frame>
					<Panel.Content>
						<Text.Header as="h2">{t('recipe.ingredients')}</Text.Header>

						<ul className={classes.list}>
							{ingredients.map((ingredient: string, index: number) => (
								<li key={index}>{ingredient}</li>
							))}
						</ul>
					</Panel.Content>
				</Panel.Frame>
			</div>

			<div className={classes.section}>
				<Panel.Frame>
					<Panel.Content>
						<Text.Header as="h2">{t('recipe.directions')}</Text.Header>

						<ol className={classes.list}>
							{directions.map((ingredient: string, index: number) => (
								<li key={index}>{ingredient}</li>
							))}
						</ol>
					</Panel.Content>
				</Panel.Frame>
			</div>
		</div>
	);
}

export default View;
