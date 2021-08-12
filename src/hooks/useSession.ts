import { useCallback, useContext, useEffect } from 'react';
import shallow from 'zustand/shallow';

import ApiContext from '@/context/api';
import { useSessionStore } from '@/stores/session';
import { User } from '@/types/user';

type UseSession = {
	clearSession: VoidFunction;
	isAuthenticated: boolean;
	isLoading: boolean;
	user: User;
};

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

	const checkForLocalUserData = useCallback(async () => {
		setState('initializing');

		const authToken = localStorage.getItem('auth-token');
		const userId = localStorage.getItem('user-id');

		if (!authToken || !userId) {
			// User does not exist. Will need to login.
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
				localStorage.removeItem('auth-token');
				localStorage.removeItem('user-id');

				setState('done');
			}
		}
	}, [api, setState, setUser]);

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
