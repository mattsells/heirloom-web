import { useContext } from 'react';
import { useQuery } from 'react-query';

import { Application } from '@/components/Layout';
import { ApiContext } from '@/context';

function Recipes() {
	const api = useContext(ApiContext);

	// TODO: Create something to make these requests
	// TODO: Filter by active account
	// TODO: Remove all console logs
	const { data, error, isLoading } = useQuery('recipes', () =>
		api.get('recipes')
	);

	console.log('data', data);
	console.log('error', error);
	console.log('isLoading', isLoading);

	return (
		<Application>
			<h1>Recipes</h1>
		</Application>
	);
}

export default Recipes;
