import create from 'zustand';

import { Account } from '@/types/account';

type AccountState = 'waiting' | 'initializing' | 'done';

type UseAccountState = {
	account: Account;
	state: AccountState;
	setAccount: (account: Account) => void;
	setState: (state: AccountState) => void;
};

const useAccountStore = create<UseAccountState>((set) => ({
	state: 'waiting',
	account: null,
	setAccount: (account: Account) => set({ account }),
	setState: (state: AccountState) => set({ state }),
}));

export { useAccountStore };
