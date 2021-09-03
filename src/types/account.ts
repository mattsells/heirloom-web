import { User } from './user';

export type AccountUserRole = 'admin' | 'owner' | 'standard';

export type Account = {
	id: number;
};

export type AccountUser = {
	id: number;
	account?: Account;
	role: AccountUserRole;
	user?: User;
};
