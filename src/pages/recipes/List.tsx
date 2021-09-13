import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import * as Modal from '@/components/Modal';
import * as Recipe from '@/components/Recipe';
import * as Text from '@/components/Text';
import { ApiContext } from '@/context';
import useActiveAccount from '@/hooks/useActiveAccount';
import { Recipe as RecipeType } from '@/types/recipe';

function Recipes() {
	const api = useContext(ApiContext);
	const { account } = useActiveAccount();
	const { t } = useTranslation();

	const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

	// TODO: Create something to make these requests
	const { data, isLoading } = useQuery(
		'recipes',
		() =>
			api.get<RecipeType[]>('recipes', { filters: { account: account.id } }),
		{
			enabled: !!account,
		}
	);

	return (
		<>
			<Text.Header>{t('recipes.title')}</Text.Header>

			<Recipe.List
				isLoading={isLoading}
				onClickAddRecipe={(): void => setIsCreateModalVisible(true)}
				recipes={data?.data}
			/>

			<Modal.Modal
				isVisible={isCreateModalVisible}
				onDismiss={(): void => setIsCreateModalVisible(false)}
			>
				<Modal.Content>
					<Text.Header as="h2">{t('recipes.add')}</Text.Header>
					<Recipe.Form />
				</Modal.Content>
			</Modal.Modal>
		</>
	);
}

export default Recipes;
