// Routing for API routes

const routes = {
	accountUsers: {
		index: 'account_users',
	},
	recipes: {
		index: 'recipes',
		show: 'recipes/:id',
	},
	stories: {
		index: 'stories',
	},
	users: {
		show: 'users/:id',
		signIn: 'users/sign_in',
		signUp: 'users/sign_up',
		signOut: 'users/sign_out',
	},
};

export default routes;
