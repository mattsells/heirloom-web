import { Route } from 'react-router-dom';

import ProtectedRoute from '@/components/ProtectedRoute';
import useRedirect from '@/hooks/useRedirect';
import Login from '@/pages/auth/Login';
import Profile from '@/pages/Profile';
import Registration from '@/pages/auth/Registration';
import { routes } from '@/router';

function Router() {
	const { redirect } = useRedirect();

	if (redirect) {
		return redirect;
	}

	// TODO: Pull template out of individual pages and wrap around router
	return (
		<>
			<Route path={routes.login}>
				<Login />
			</Route>

			<Route path={routes.registration}>
				<Registration />
			</Route>

			<ProtectedRoute path={routes.profile}>
				<Profile />
			</ProtectedRoute>
		</>
	);
}

export default Router;
