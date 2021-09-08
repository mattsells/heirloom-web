import { Route, Switch } from 'react-router-dom';

import ProtectedRoute from '@/components/ProtectedRoute';
import useRedirect from '@/hooks/useRedirect';
import Login from '@/pages/auth/Login';
import Registration from '@/pages/auth/Registration';
import Home from '@/pages/Home';
import Recipes from '@/pages/recipes/Recipes';
import Sandbox from '@/pages/Sandbox';
import { routes } from '@/router';

function Router() {
	const { redirect } = useRedirect();

	if (redirect) {
		return redirect;
	}

	// TODO: Pull template out of individual pages and wrap around router
	return (
		<Switch>
			<Route path="/" exact>
				<Sandbox />
			</Route>

			<Route path={routes.login}>
				<Login />
			</Route>

			<Route path={routes.registration}>
				<Registration />
			</Route>

			<ProtectedRoute path={routes.home}>
				<Home />
			</ProtectedRoute>

			<ProtectedRoute path={routes.recipes}>
				<Recipes />
			</ProtectedRoute>
		</Switch>
	);
}

export default Router;
