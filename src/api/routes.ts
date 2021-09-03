// Routing for API routes

const routes = {
	accountUsers: {
		index: 'account_users',
	},
	users: {
		show: 'users/:id',
		signIn: 'users/sign_in',
		signUp: 'users/sign_up',
	},
};

export default routes;
