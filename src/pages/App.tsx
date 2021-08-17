import { Toaster } from 'react-hot-toast';

import useSession from '@/hooks/useSession';
import Router from '@/router';

function App() {
	const { isLoading } = useSession();

	if (isLoading) {
		return <h1>LOADING DATA</h1>;
	}

	return (
		<>
			<Toaster position="top-right" />
			<Router />
		</>
	);
}

export default App;
