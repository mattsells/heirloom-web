import shallow from 'zustand/shallow'

import { useSessionStore } from '../stores/session';
import { User } from '../types/user';

type UseSession = {
	isAuthenticated: boolean;
	isLoadingUser: boolean;
	user: User;
}

function useSession(): UseSession {
	const { isInitialized, isLoading, user, setIsInitialized, setIsLoading, setUser } = useSessionStore(state => ({
		isInitialized: state.isInitialized,
		isLoading: state.isLoading,
		user: state.user,
		setIsInitialized: state.setIsInitialized,
		setIsLoading: state.setIsLoading,
		setUser: state.setUser,
	}), shallow);

	const shouldBeginAuthentication = isInitialized && !isLoading;

	const checkForLocalUserData = async () => {
		console.log('CHECK FOR USER')
		const authToken = localStorage.getItem('auth-token');
		const userId = localStorage.getItem('user-id');

		if (!authToken || !userId) {
			// User dos not exist. Will need to login.
			setIsLoading(false);
			setIsInitialized(false);
		} else {
			// Attempt to fetch user data
			// TODO: Create HTTP client
			const response = await fetch(`http://localhost:3000/v1/users/${userId}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: authToken,
					'Key-Inflection': 'camel'
				}
			});

			if (response.ok) {
				// Save user data in local storage
				const data = await response.json();

				setUser(data);
				setIsLoading(false);
				setIsInitialized(false);
			} else {
				// Token was not good. Clear local data
				localStorage.removeItem('auth-token');
				localStorage.removeItem('user-id');

				setIsLoading(false);
				setIsInitialized(false);
			}
		}
	}

	// TODO: This is firing twice. Need to clean up
	if (shouldBeginAuthentication) {
		setIsLoading(true);
		checkForLocalUserData();
	}

	return {
		isAuthenticated: !!user,
		isLoadingUser: isInitialized,
		user,
	}
}

export default useSession;
