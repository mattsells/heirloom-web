import { useContext } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';

import * as Layout from '@/components/Layout';
import * as Recipe from '@/components/Recipe';
import { ApiContext } from '@/context';
import { IDParams } from '@/types/global';
import { Recipe as RecipeType } from '@/types/recipe';

function Show() {
	const api = useContext(ApiContext);
	const { id } = useParams<IDParams>();

	// TODO: Create something to make these requests
	const { data, isLoading } = useQuery(['recipe', id], () =>
		api.get<RecipeType>(`recipes/${id}`)
	);

	return <Recipe.View isLoading={isLoading} recipe={data?.data} />;
}

export default Show;
