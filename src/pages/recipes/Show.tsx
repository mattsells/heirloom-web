import { useQuery } from 'react-query';
import { useParams } from 'react-router';

import routes from '@/api/routes';
import * as Recipe from '@/components/Recipe';
import { useHttpClient } from '@/context/api';
import { IDParams } from '@/types/global';
import { Recipe as RecipeType } from '@/types/recipe';
import { route } from '@/utils/routing';

function Show() {
	const http = useHttpClient();
	const { id } = useParams<IDParams>();

	// TODO: Create something to make these requests
	const { data, isLoading } = useQuery(['recipe', id], () =>
		http.get<RecipeType>(route(routes.recipes.show, { id, extended: true }))
	);

	return <Recipe.View isLoading={isLoading} recipe={data?.data} />;
}

export default Show;
