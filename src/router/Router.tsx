import { Route, Link } from 'react-router-dom';

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
			<h1>Heirloom</h1>
			<Link to="/profile">Profile</Link>
			<br />
			<Link to="/login">Login</Link>

			<ProtectedRoute path="/profile">
				<Profile />
			</ProtectedRoute>

			<Route path="/login">
				<Login />
			</Route>
		</>
	);
}

export default Router;
