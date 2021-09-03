import '@/styles/app.css';

import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import useSession from '@/hooks/useSession';
import Router from '@/router';
import { Size } from '@/variables/fonts';

const queryClient = new QueryClient();

function App() {
	// TODO: Create loading screen
	const { isLoading } = useSession();

	if (isLoading) {
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
