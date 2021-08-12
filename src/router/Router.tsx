import { BrowserRouter, Route, Link } from 'react-router-dom';

import ProtectedRoute from '@/components/ProtectedRoute';
import Profile from '@/pages/Profile';
import Login from '@/pages/Login';

function Router() {
	return (
		<BrowserRouter>
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
		</BrowserRouter>
	);
}

export default Router;
