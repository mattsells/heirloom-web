import { useContext } from 'react';
import { useQuery } from 'react-query';

import { Application } from '@/components/Layout';
import { List as RecipeList } from '@/components/Recipe';
import { ApiContext } from '@/context';
import useActiveAccount from '@/hooks/useActiveAccount';
import { Recipe } from '@/types/recipe';

function Recipes() {
	const api = useContext(ApiContext);
	const { account } = useActiveAccount();

	// TODO: Create something to make these requests
	// FIXME: This is getting an undefined error
	const { data, isLoading } = useQuery('recipes', () =>
		api.get<Recipe[]>('recipes', { filters: { account: account.id } })
	);

	return (
		<Application>
			<h1>Recipes</h1>

			<RecipeList isLoading={isLoading} recipes={data?.data} />
		</Application>
	);
}

export default Recipes;
