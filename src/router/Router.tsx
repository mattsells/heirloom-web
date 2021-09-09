import { Route, Switch } from 'react-router-dom';

import ProtectedRoute from '@/components/ProtectedRoute';
import useRedirect from '@/hooks/useRedirect';
import Login from '@/pages/auth/Login';
import Registration from '@/pages/auth/Registration';
import Home from '@/pages/Home';
import Show from '@/pages/recipes/Show';
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
			{/* <Route path="/" exact>
				<Sandbox />
			</Route> */}

			<Route path={routes.login} component={Login} />
			<Route path={routes.registration} component={Registration} />

			<ProtectedRoute path={routes.home} component={Home} />
			<ProtectedRoute path={routes.recipe} component={Show} />
			<ProtectedRoute path={routes.recipes} component={Recipes} />
		</Switch>
	);
}

export default Router;
