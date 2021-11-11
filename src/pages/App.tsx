import '@/styles/app.css';

import { Suspense, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import SimpleReactLightbox from 'simple-react-lightbox';

import ApiContext from '@/context/api';
import { HttpClient } from '@/lib/http';
import useActiveAccount from '@/hooks/useActiveAccount';
import useSession from '@/hooks/useSession';
import Router from '@/router';
import { Size } from '@/variables/fonts';
import Loading from '@/pages/Loading';

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
const api = new HttpClient();

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
			<Toaster
				position="top-right"
				toastOptions={{
					style: {
						fontSize: Size.regular,
					},
				}}
			/>

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
