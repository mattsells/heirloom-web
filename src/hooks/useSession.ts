import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router';
import shallow from 'zustand/shallow';

import apiRoutes from '@/api/routes';
import { useHttpClient } from '@/context/api';
import HttpError from '@/lib/http/HttpError';
import webRoutes from '@/router/routes';
import { useSessionStore } from '@/stores/session';
import { User } from '@/types/user';

import useActiveAccount from './useActiveAccount';

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
	const http = useHttpClient();
	const { activateUserAccount } = useActiveAccount();
	const history = useHistory();

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
		http.clearToken();

		localStorage.removeItem(STORAGE_AUTH_TOKEN_KEY);
		localStorage.removeItem(STORAGE_USER_ID_KEY);

		setUser(null);
	}, [http, setUser]);

	const handleActivateUser = useCallback(
		(user: User) => {
			setUser(user);
			activateUserAccount(user);
		},
		[activateUserAccount, setUser]
	);

	const handleSetSession = useCallback(
		(user: User, authToken: string) => {
			http.setToken(authToken);

			localStorage.setItem(STORAGE_AUTH_TOKEN_KEY, authToken);
			localStorage.setItem(STORAGE_USER_ID_KEY, user.id);

			handleActivateUser(user);
		},
		[http, handleActivateUser]
	);

	const handleSignOut = useCallback(async () => {
		try {
			await http.get(apiRoutes.users.signOut);
			handleClearSession();
			history.push(webRoutes.login);
		} catch (err) {
			if (err instanceof HttpError) {
				toast.error(err.message);
			}
		}
	}, [http, handleClearSession, history]);

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
				http.setToken(authToken);

				const response = await http.get<User>(`users/${userId}`);

				handleActivateUser(response.data);
				setState('done');
			} catch (err) {
				// Request was unsuccessful. Clear storage of invalid keys
				// and set state to complete
				handleClearSession();
				setState('done');
			}
		}
	}, [http, handleActivateUser, handleClearSession, setState]);

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
