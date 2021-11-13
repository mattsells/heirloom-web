// Routing for application router

import RouteDirectory from '@/lib/http/RouteDirectory';

const routes = new RouteDirectory();

routes.add('default', '/');
routes.add('home', '/');
routes.add('login');
routes.add('recipes');
routes.add('recipe', '/recipe/:id');
routes.add('recipe.edit', '/recipe/:id/edit');
routes.add('registration', '/join');

export default routes;
