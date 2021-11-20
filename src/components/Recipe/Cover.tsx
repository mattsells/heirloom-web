import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import * as Button from '@/components/Button';
import * as Frame from '@/components/Frame';
import * as Text from '@/components/Text';
import { Recipe } from '@/types/recipe';

type Props = {
	onClickEdit: VoidFunction;
	recipe: Recipe;
};

function Cover({ onClickEdit, recipe }: Props): ReactElement<Props> {
	const { t } = useTranslation();

	const title = (
		<div className="items-center flex py-0 px-lg w-full">
			<div className="flex-grow">
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
			<div
				className="flex items-end h-full bg-center bg-no-repeat bg-cover"
				style={{ backgroundImage: `url(${recipe.coverImageUrlLarge})` }}
			>
				{title}
			</div>
		</Frame.Ratio>
	);
}

export default Cover;
