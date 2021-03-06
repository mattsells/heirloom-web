import '@/styles/app.css';

import { Suspense, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import SimpleReactLightbox from 'simple-react-lightbox';

import routes from '@/api/routes';
import ApiContext from '@/context/api';
import useActiveAccount from '@/hooks/useActiveAccount';
import useSession from '@/hooks/useSession';
import { HttpClient } from '@/lib/http';
import Loading from '@/pages/Loading';
import Router from '@/router';

// Client for server state
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			retry: false,
		},
	},
});

// Create a new client instance and add to context
const api = new HttpClient(routes);

function App() {
	const { isLoading: isLoadingAccount } = useActiveAccount();
	const { checkForLocalUserData, isLoading: isLoadingSession } = useSession();
	const [isLoaded, setIsLoaded] = useState(false);

	// On app load retrieve stored user information if available
	useEffect(() => {
		checkForLocalUserData();
	}, [checkForLocalUserData]);

	useEffect(() => {
		setTimeout(() => {
			setIsLoaded(true);
		}, 1000);
	}, []);

	if (isLoadingSession || isLoadingAccount || !isLoaded) {
		return <Loading />;
	}

	return (
		<Suspense fallback={<Loading />}>
			<Toaster position="top-right" />

			{/* Main app is rendered by the router */}
			<Router />
		</Suspense>
	);
}

export default function AppProvider() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<ApiContext.Provider value={api}>
					<SimpleReactLightbox>
						<App />
					</SimpleReactLightbox>
				</ApiContext.Provider>
			</BrowserRouter>
		</QueryClientProvider>
	);
}
