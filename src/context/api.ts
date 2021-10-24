import { createContext, useContext } from 'react';

import { HttpClient } from '@/lib/http';

const ApiContext = createContext<HttpClient>(undefined);

export function useHttpClient() {
	const client = useContext(ApiContext);

	if (!client) {
		throw new Error('No HTTP client configured');
	}

	return client;
}

export default ApiContext;
