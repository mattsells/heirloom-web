import { Redirect, Route, Switch } from 'react-router-dom';

import * as Layout from '@/components/Layout';
import * as Path from '@/components/Route';
import * as Auth from '@/pages/auth';
import NotFound from '@/pages/NotFound';
import * as Recipes from '@/pages/recipes';
import { routes } from '@/router';

function Router() {
	return (
		<Switch>
			<Route path={routes.get('login')} component={Auth.Login} />
			<Route path={routes.get('registration')} component={Auth.Registration} />

			<Layout.Application>
				<Switch>
					<Path.Protected
						path={routes.get('recipe')}
						component={Recipes.Show}
					/>
					<Path.Protected
						path={routes.get('recipes')}
						component={Recipes.List}
					/>
					<Path.Protected exact path="/">
						<Redirect to={routes.get('recipes')} />
					</Path.Protected>

					{/* Default to 404 only while logged in */}
					<Path.Protected path={routes.get('default')} component={NotFound} />
				</Switch>
			</Layout.Application>
		</Switch>
	);
}

export default Router;
