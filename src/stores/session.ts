import create from 'zustand';

import { User } from '@/types/user';

type SessionState = 'waiting' | 'initializing' | 'done';

type UseSessionStore = {
	state: SessionState;
	user: User;
	setState: (state: SessionState) => void;
	setUser: (user: User) => void;
};

const useSessionStore = create<UseSessionStore>((set) => ({
	state: 'waiting',
	user: null,
	setState: (state: SessionState) => set({ state }),
	setUser: (user: User) => set({ user }),
}));

export { useSessionStore };
