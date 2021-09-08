import '@/styles/app.css';

import { Suspense, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import ApiContext from '@/context/api';
import { HttpClient } from '@/lib/http';
import useActiveAccount from '@/hooks/useActiveAccount';
import useSession from '@/hooks/useSession';
import Router from '@/router';
import { Size } from '@/variables/fonts';

// Client for server state
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	},
});

// Create a new client instance and add to context
const api = new HttpClient();

function App() {
	const { isLoading: isLoadingAccount } = useActiveAccount();
	const { checkForLocalUserData, isLoading: isLoadingSession } = useSession();

	// On app load retrieve stored user information if available
	useEffect(() => {
		checkForLocalUserData();
	}, [checkForLocalUserData]);

	if (isLoadingSession || isLoadingAccount) {
		return <h1>LOADING USER DATA</h1>;
	}

	return (
		<Suspense fallback="LOADING LANGUAGE DATA">
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
					<App />
				</ApiContext.Provider>
			</BrowserRouter>
		</QueryClientProvider>
	);
}
