import { useCallback, useContext, useEffect } from 'react';
import shallow from 'zustand/shallow';

import ApiContext from '@/context/api';
import { useSessionStore } from '@/stores/session';
import { User } from '@/types/user';

type UseSession = {
	clearSession: VoidFunction;
	isAuthenticated: boolean;
	isLoading: boolean;
	setSession: (user: User, authToken: string) => void;
	user: User;
};

const STORAGE_AUTH_TOKEN_KEY = 'auth-token';
const STORAGE_USER_ID_KEY = 'user-id';

function useSession(): UseSession {
	const api = useContext(ApiContext);

	const { state, user, setState, setUser } = useSessionStore(
		(state) => ({
			state: state.state,
			user: state.user,
			setState: state.setState,
			setUser: state.setUser,
		}),
		shallow
	);

	const handleClearSession = useCallback(() => {
		api.clearToken();

		localStorage.removeItem('auth-token');
		localStorage.removeItem('user-id');

		setUser(null);
	}, [api, setUser]);

	const handleSetSession = useCallback(
		(user: User, authToken: string) => {
			api.setToken(authToken);

			localStorage.setItem(STORAGE_AUTH_TOKEN_KEY, authToken);
			localStorage.setItem(STORAGE_USER_ID_KEY, user.id);

			setUser(user);
		},
		[api, setUser]
	);

	const checkForLocalUserData = useCallback(async () => {
		setState('initializing');

		const authToken = localStorage.getItem(STORAGE_AUTH_TOKEN_KEY);
		const userId = localStorage.getItem(STORAGE_USER_ID_KEY);

		if (!authToken || !userId) {
			// Unable to make a request without token and id. Do not make any
			// additional api calls
			setState('done');
		} else {
			try {
				api.setToken(authToken);

				const response = await api.get<User>(`users/${userId}`);

				setUser(response.data);
				setState('done');
			} catch (err) {
				// Request was unsuccessful. Clear storage of invalid keys
				// and set state to complete
				handleClearSession();
				setState('done');
			}
		}
	}, [api, handleClearSession, setState, setUser]);

	useEffect(() => {
		if (state === 'waiting') {
			checkForLocalUserData();
		}
	}, [checkForLocalUserData, state]);

	return {
		clearSession: handleClearSession,
		isAuthenticated: !!user,
		isLoading: state !== 'done',
		setSession: handleSetSession,
		user,
	};
}

export default useSession;
