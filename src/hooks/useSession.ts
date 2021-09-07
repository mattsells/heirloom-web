import { useCallback, useContext } from 'react';
import toast from 'react-hot-toast';
import shallow from 'zustand/shallow';

import apiRoutes from '@/api/routes';
import ApiContext from '@/context/api';
import webRoutes from '@/router/routes';
import { useSessionStore } from '@/stores/session';
import { User } from '@/types/user';

import useActiveAccount from './useActiveAccount';
import useRedirect from './useRedirect';

type UseSession = {
	checkForLocalUserData: VoidFunction;
	clearSession: VoidFunction;
	isAuthenticated: boolean;
	isLoading: boolean;
	setSession: (user: User, authToken: string) => void;
	signOut: VoidFunction;
	user: User;
};

const STORAGE_AUTH_TOKEN_KEY = 'auth-token';
const STORAGE_USER_ID_KEY = 'user-id';

function useSession(): UseSession {
	const api = useContext(ApiContext);
	const { activateUserAccount } = useActiveAccount();
	const { redirectTo } = useRedirect();

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

		localStorage.removeItem(STORAGE_AUTH_TOKEN_KEY);
		localStorage.removeItem(STORAGE_USER_ID_KEY);

		setUser(null);
	}, [api, setUser]);

	const handleActivateUser = useCallback(
		(user: User) => {
			setUser(user);
			activateUserAccount(user);
		},
		[activateUserAccount, setUser]
	);

	const handleSetSession = useCallback(
		(user: User, authToken: string) => {
			api.setToken(authToken);

			localStorage.setItem(STORAGE_AUTH_TOKEN_KEY, authToken);
			localStorage.setItem(STORAGE_USER_ID_KEY, user.id);

			handleActivateUser(user);
		},
		[api, handleActivateUser]
	);

	const handleSignOut = useCallback(async () => {
		try {
			await api.get(apiRoutes.users.signOut);
			handleClearSession();
			redirectTo(webRoutes.login);
		} catch (err) {
			toast.error(err.message);
		}
	}, [api, handleClearSession, redirectTo]);

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

				handleActivateUser(response.data);
				setState('done');
			} catch (err) {
				// Request was unsuccessful. Clear storage of invalid keys
				// and set state to complete
				handleClearSession();
				setState('done');
			}
		}
	}, [api, handleActivateUser, handleClearSession, setState]);

	return {
		checkForLocalUserData,
		clearSession: handleClearSession,
		isAuthenticated: !!user,
		isLoading: state !== 'done',
		setSession: handleSetSession,
		signOut: handleSignOut,
		user,
	};
}

export default useSession;
