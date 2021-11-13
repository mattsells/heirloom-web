import { useQuery } from 'react-query';
import { useParams } from 'react-router';

import * as Recipe from '@/components/Recipe';
import { useHttpClient } from '@/context/api';
import HttpError from '@/lib/http/HttpError';
import HttpResponse from '@/lib/http/HttpResponse';
import NotFound from '@/pages/NotFound';
import { IDParams } from '@/types/global';
import { Recipe as RecipeType } from '@/types/recipe';

function Show() {
	const http = useHttpClient();
	const params = useParams<IDParams>();

	const id = parseInt(params.id, 10);

	const { data, error, isError, isLoading } = useQuery<
		HttpResponse<RecipeType>,
		HttpError
	>(['recipe', id], () =>
		http.get<RecipeType>('recipe', { params: { id, extended: true } })
	);

	if (isError && error.isNotFound) {
		return <NotFound />;
	}

	return <Recipe.View isLoading={isLoading} recipe={data?.data} />;
}

export default Show;
