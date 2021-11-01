import { Route, Switch } from 'react-router-dom';

import * as Layout from '@/components/Layout';
import * as Path from '@/components/Route';
import * as Auth from '@/pages/auth';
import NotFound from '@/pages/NotFound';
import * as Recipes from '@/pages/recipes';
import { routes } from '@/router';

function Router() {
	return (
		<Switch>
			<Route path={routes.login} component={Auth.Login} />
			<Route path={routes.registration} component={Auth.Registration} />

			<Layout.Application>
				<Switch>
					<Path.Protected path={routes.recipe} component={Recipes.Show} />
					<Path.Protected path={routes.recipes} component={Recipes.List} />

					{/* Default to 404 only while logged in */}
					<Path.Protected path="/" component={NotFound} />
				</Switch>
			</Layout.Application>
		</Switch>
	);
}

export default Router;
