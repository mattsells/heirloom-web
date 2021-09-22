import { useContext } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';

import routes from '@/api/routes';
import * as Recipe from '@/components/Recipe';
import { ApiContext } from '@/context';
import { IDParams } from '@/types/global';
import { Recipe as RecipeType } from '@/types/recipe';
import { route } from '@/utils/routing';

function Show() {
	const api = useContext(ApiContext);
	const { id } = useParams<IDParams>();

	// TODO: Create something to make these requests
	const { data, isLoading } = useQuery(['recipe', id], () =>
		api.get<RecipeType>(route(routes.recipes.show, { id, extended: true }))
	);

	return <Recipe.View isLoading={isLoading} recipe={data?.data} />;
}

export default Show;
