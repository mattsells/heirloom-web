import useSession from '@/hooks/useSession';
import Router from '@/router';

function App() {
	const { isLoading } = useSession();

	if (isLoading) {
		return <h1>LOADING DATA</h1>;
	}

	return <Router />;
}

export default App;
