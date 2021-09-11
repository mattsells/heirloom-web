import { ReactElement } from 'react';
import { BiPlusMedical } from 'react-icons/bi';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';

import * as Button from '@/components/Button';
import * as Loading from '@/components/Loading';
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
	root: {
		height: '100%',
	},
});

function View({ isLoading, recipe }: Props): ReactElement<Props> {
	const classes = useStyles();
	const { t } = useTranslation();

	if (isLoading) {
		return <Loading.Placeholder text={t('recipe.loading')} />;
	}

	return (
		<div className={classes.root}>
			<Text.Header>{recipe.name}</Text.Header>
		</div>
	);
}

export default View;
