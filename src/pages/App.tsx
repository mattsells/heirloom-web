import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';
import ProtectedRoute from '../components/ProtectedRoute';
import useSession from '../hooks/useSession';

import {HttpClient} from '@/lib/http';

function App() {
	const { isLoading } = useSession();

	if (isLoading) {
		return <h1>LOADING DATA</h1>;
	}

	return (
		<>
			<Router>
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
			</Router>
		</>
	);
}

export default App;
