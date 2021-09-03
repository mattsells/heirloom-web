import '@/styles/app.css';

import { Suspense, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import useActiveAccount from '@/hooks/useActiveAccount';
import useSession from '@/hooks/useSession';
import Router from '@/router';
import { Size } from '@/variables/fonts';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	},
});

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
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
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
				</BrowserRouter>
			</QueryClientProvider>
		</Suspense>
	);
}

export default App;
