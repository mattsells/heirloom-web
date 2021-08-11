import { useCallback, useEffect } from 'react';
import shallow from 'zustand/shallow';

import { useSessionStore } from '../stores/session';
import { User } from '../types/user';

type UseSession = {
	clearSession: VoidFunction;
	isAuthenticated: boolean;
	isLoading: boolean;
	user: User;
};

function useSession(): UseSession {
	const { state, user, setState, setUser } = useSessionStore(
		(state) => ({
			state: state.state,
			user: state.user,
			setState: state.setState,
			setUser: state.setUser,
		}),
		shallow
	);

	const checkForLocalUserData = useCallback(async () => {
		setState('initializing');

		const authToken = localStorage.getItem('auth-token');
		const userId = localStorage.getItem('user-id');

		if (!authToken || !userId) {
			// User does not exist. Will need to login.
			setState('done');
		} else {
			// Attempt to fetch user data
			// TODO: Create HTTP client and attach token to header
			const response = await fetch(`http://localhost:3000/v1/users/${userId}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: authToken,
					'Key-Inflection': 'camel',
				},
			});

			if (response.ok) {
				// Save user data in local storage
				const data = await response.json();

				setUser(data);
				setState('done');
			} else {
				// Token was not good. Clear local data
				localStorage.removeItem('auth-token');
				localStorage.removeItem('user-id');

				setState('done');
			}
		}
	}, []);

	const handleClearSession = () => {
		localStorage.removeItem('auth-token');
		localStorage.removeItem('user-id');

		setUser(null);
	};

	useEffect(() => {
		if (state === 'waiting') {
			checkForLocalUserData();
		}
	}, [checkForLocalUserData, state]);

	return {
		clearSession: handleClearSession,
		isAuthenticated: !!user,
		isLoading: state !== 'done',
		user,
	};
}

export default useSession;
