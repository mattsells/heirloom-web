import create from 'zustand';

import { AccountUser } from '@/types/account';

type AccountState = 'waiting' | 'initializing' | 'done';

type UseAccountStore = {
	accountUser: AccountUser;
	state: AccountState;
	setAccountUser: (accountUser: AccountUser) => void;
	setState: (state: AccountState) => void;
};

const useAccountStore = create<UseAccountStore>((set) => ({
	state: 'waiting',
	accountUser: null,
	setAccountUser: (accountUser: AccountUser) => set({ accountUser }),
	setState: (state: AccountState) => set({ state }),
}));

export { useAccountStore };
