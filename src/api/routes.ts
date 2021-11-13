// Routing for API routes

import RouteDirectory from '@/lib/http/RouteDirectory';

const routes = new RouteDirectory();

routes.add('accountUsers');
routes.add('recipe', 'recipes/:id');
routes.add('recipes');
routes.add('stories');
routes.add('user', 'users/:id');
routes.add('users.signIn', 'users/sign_in');
routes.add('users.signOut', 'users/sign_out');
routes.add('users.signUp', 'users/sign_up');

export default routes;
