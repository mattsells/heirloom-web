import { useCallback } from 'react';
import shallow from 'zustand/shallow';

import routes from '@/api/routes';
import { useHttpClient } from '@/context/api';
import { useAccountStore } from '@/stores/accounts';
import { Account, AccountUser, AccountUserRole } from '@/types/account';
import { User } from '@/types/user';

type UseActiveAccount = {
	account: Account;
	accountUser: AccountUser;
	activateUserAccount: (user: User) => void;
	isLoading: boolean;
	role: AccountUserRole;
};

const STORAGE_ACTIVE_ACCOUNT_ID = 'active-account-id';

function useActiveAccount(): UseActiveAccount {
	const { accountUser, state, setAccountUser, setState } = useAccountStore(
		(state) => ({
			accountUser: state.accountUser,
			state: state.state,
			setAccountUser: state.setAccountUser,
			setState: state.setState,
		}),
		shallow
	);

	const http = useHttpClient();

	const activateUserAccount = useCallback(
		async (user: User) => {
			setState('initializing');

			const activeAccountId = localStorage.getItem(STORAGE_ACTIVE_ACCOUNT_ID);

			try {
				// Get all accountUsers for this user, which will return a list
				// of all the accounts the user has access to
				const accountUsers = await http.get<AccountUser[]>(
					routes.accountUsers.index,
					{
						extended: true,
						filters: { user: user.id },
					}
				);

				let activeAccountUser: AccountUser;

				// Attempt to set active account based on stored ID
				if (activeAccountId) {
					activeAccountUser = accountUsers.data.find(
						(accountUser) =>
							accountUser.account.id === parseInt(activeAccountId, 10)
					);

					// If an account is not found then the stored ID is invalid
					if (!activeAccountUser) {
						localStorage.removeItem(STORAGE_ACTIVE_ACCOUNT_ID);
					}
				}

				// If active account does not exist, set as own account
				if (!activeAccountUser) {
					activeAccountUser = accountUsers.data.find(
						(accountUser) => accountUser.role === 'owner'
					);
				}

				// TODO: Check if account still does not exist, but this should
				// never be the case

				localStorage.setItem(
					STORAGE_ACTIVE_ACCOUNT_ID,
					activeAccountUser.account.id.toString()
				);

				setState('done');
				setAccountUser(activeAccountUser);
			} catch (err) {
				// TODO: What should happen if there is an error here?
			}
		},
		[http, setAccountUser, setState]
	);

	return {
		account: accountUser?.account,
		accountUser,
		activateUserAccount,
		isLoading: state === 'initializing',
		role: accountUser?.role,
	};
}

export default useActiveAccount;
