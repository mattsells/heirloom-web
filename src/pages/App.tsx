import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

import useSession from '@/hooks/useSession';
import Router from '@/router';

function App() {
	const { isLoading } = useSession();

	if (isLoading) {
		return <h1>LOADING DATA</h1>;
	}

	return (
		<BrowserRouter>
			<Toaster position="top-right" />
			<Router />
		</BrowserRouter>
	);
}

export default App;
