import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useInfiniteQuery } from 'react-query';

import * as Modal from '@/components/Modal';
import * as Recipe from '@/components/Recipe';
import * as Text from '@/components/Text';
import { useHttpClient } from '@/context/api';
import useActiveAccount from '@/hooks/useActiveAccount';
import { IndexResponse } from '@/types/global';
import { Recipe as RecipeType } from '@/types/recipe';

function Recipes() {
	const http = useHttpClient();
	const { account } = useActiveAccount();
	const { t } = useTranslation();

	const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

	const { data, isError, fetchNextPage, hasNextPage, isFetching, isLoading } =
		useInfiniteQuery(
			'recipes',
			({ pageParam }) => {
				return http.get<IndexResponse<{ recipes: RecipeType[] }>>('recipes', {
					filters: { account: account.id },
					page: pageParam,
				});
			},
			{
				enabled: !!account,
				getNextPageParam: (lastPage) => lastPage.data.meta.nextPage,
				keepPreviousData: true,
			}
		);

	const [sentryRef] = useInfiniteScroll({
		disabled: isError,
		hasNextPage,
		loading: isFetching,
		onLoadMore: fetchNextPage,
		rootMargin: '0px 0px 200px 0px',
	});

	const allRecipes = useMemo(() => {
		if (!data) {
			return [];
		}
		return data.pages.reduce((allPages, page) => {
			return [...allPages, ...page.data.recipes];
		}, []);
	}, [data]);

	return (
		<>
			<Text.Header>{t('recipes.title')}</Text.Header>

			<Recipe.List
				isLoading={isLoading}
				onClickAddRecipe={(): void => setIsCreateModalVisible(true)}
				recipes={allRecipes}
			/>

			<div ref={sentryRef} />

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
