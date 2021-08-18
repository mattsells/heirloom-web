import { Route } from 'react-router-dom';

import ProtectedRoute from '@/components/ProtectedRoute';
import useRedirect from '@/hooks/useRedirect';
import Profile from '@/pages/Profile';
import Login from '@/pages/Login';

function Router() {
	const { redirect } = useRedirect();

	if (redirect) {
		return redirect;
	}

	return (
		<>
			<Route path="/login">
				<Login />
			</Route>

			<ProtectedRoute path="/profile">
				<Profile />
			</ProtectedRoute>
		</>
	);
}

export default Router;
