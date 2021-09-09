import { ReactElement } from 'react';
import { BiPlusMedical } from 'react-icons/bi';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';

import * as Button from '@/components/Button';
import * as Text from '@/components/Text';
import { Recipe } from '@/types/recipe';
import { Forest } from '@/variables/colors';
import { Size } from '@/variables/fonts';
import { Space } from '@/variables/space';

import Card from './Card';

type Props = {
	isLoading: boolean;
	recipe: Recipe;
};

const useStyles = createUseStyles({
	root: {},
});

function View({ isLoading, recipe }: Props): ReactElement<Props> {
	const classes = useStyles();
	const { t } = useTranslation();

	// TODO: Add loading indicator
	if (isLoading) {
		return <h1>LOADING</h1>;
	}

	return (
		<div className={classes.root}>
			<Text.Header>{recipe.name}</Text.Header>
		</div>
	);
}

export default View;
