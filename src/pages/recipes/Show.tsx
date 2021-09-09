import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';

import * as Layout from '@/components/Layout';
import * as Modal from '@/components/Modal';
import * as Recipe from '@/components/Recipe';
import * as Text from '@/components/Text';
import { ApiContext } from '@/context';
import useActiveAccount from '@/hooks/useActiveAccount';
import { IDParams } from '@/types/global';
import { Recipe as RecipeType } from '@/types/recipe';

function Show() {
	const api = useContext(ApiContext);
	const { t } = useTranslation();
	const { id } = useParams<IDParams>();

	// TODO: Create something to make these requests
	const { data, isLoading } = useQuery(['recipe', id], () =>
		api.get<RecipeType>(`recipes/${id}`)
	);

	return (
		<Layout.Application>
			<Recipe.View isLoading={isLoading} recipe={data?.data} />
		</Layout.Application>
	);
}

export default Show;
