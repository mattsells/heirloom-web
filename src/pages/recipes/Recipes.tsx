import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import * as Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import { List as RecipeList } from '@/components/Recipe';
import * as Text from '@/components/Text';
import { ApiContext } from '@/context';
import useActiveAccount from '@/hooks/useActiveAccount';
import { Recipe } from '@/types/recipe';

function Recipes() {
	const api = useContext(ApiContext);
	const { account } = useActiveAccount();
	const { t } = useTranslation();

	const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

	// TODO: Create something to make these requests
	// FIXME: Don't make request unless account is present
	const { data, isLoading } = useQuery(['recipes', account], () =>
		api.get<Recipe[]>('recipes', { filters: { account: account.id } })
	);

	return (
		<Layout.Application>
			<Text.Header>{t('recipes.title')}</Text.Header>

			<RecipeList
				isLoading={isLoading}
				onClickAddRecipe={(): void => setIsCreateModalVisible(true)}
				recipes={data?.data}
			/>

			<Modal
				isVisible={isCreateModalVisible}
				onDismiss={(): void => setIsCreateModalVisible(false)}
			>
				This is the modal
			</Modal>
		</Layout.Application>
	);
}

export default Recipes;
