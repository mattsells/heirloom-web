import classNames from 'classnames';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { BiPlusMedical } from 'react-icons/bi';

import * as Button from '@/components/Button';
import * as Loading from '@/components/Loading';
import { Recipe } from '@/types/recipe';

import Card from './Card';

type Props = {
	isLoading: boolean;
	onClickAddRecipe: VoidFunction;
	recipes: Recipe[];
};

function List({
	isLoading,
	onClickAddRecipe,
	recipes = [],
}: Props): ReactElement<Props> {
	const { t } = useTranslation();

	if (isLoading) {
		return <Loading.Placeholder text={t('recipes.loading')} />;
	}

	return (
		<div className="grid grid-cols-6 gap-4">
			<Button.Square id="add-recipe-tile" onClick={onClickAddRecipe}>
				<div
					className={classNames(
						'flex',
						'items-center',
						'flex-col',
						'h-full',
						'justify-center',
						'text-green-300'
					)}
				>
					<div className="text-4xl mb-2">
						<BiPlusMedical />
					</div>
					<label className="text-base" htmlFor="add-recipe-tile">
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
