import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';

import * as Button from '@/components/Button';
import * as Frame from '@/components/Frame';
import * as Text from '@/components/Text';
import { Recipe } from '@/types/recipe';
import { Space } from '@/variables';

type Props = {
	onClickEdit: VoidFunction;
	recipe: Recipe;
};

const useStyles = createUseStyles(
	{
		cover: {
			alignItems: 'flex-end',
			// TODO: Get correct URL for image
			backgroundImage: ({ recipe }: Props) =>
				`url(${recipe.coverImageUrlLarge})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat',
			display: 'flex',
			height: '100%',
		},

		level: {
			alignItems: 'center',
			display: 'flex',
			padding: `${Space.none} ${Space.wide}`,
			width: '100%',
		},

		grow: {
			flexGrow: 1,
		},
	},
	{ name: 'RecipeCover' }
);

function Cover({ onClickEdit, recipe }: Props): ReactElement<Props> {
	const classes = useStyles({ recipe } as any);
	const { t } = useTranslation();

	const title = (
		<div className={classes.level}>
			<div className={classes.grow}>
				<Text.Header>{recipe.name}</Text.Header>
			</div>

			<Button.Light onClick={onClickEdit}>{t('recipe.edit')}</Button.Light>
		</div>
	);

	if (!recipe.coverImageUrlLarge) {
		return title;
	}

	return (
		<Frame.Ratio ratio={0.35}>
			<div className={classes.cover}>{title}</div>
		</Frame.Ratio>
	);
}

export default Cover;
