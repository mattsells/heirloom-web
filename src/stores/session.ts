import create from 'zustand';

import { User } from '../types/user';

type UseSessionStore = {
	isInitialized: boolean;
	isLoading: boolean;
	user: User;
	setIsInitialized: (isInitialized: boolean) => void;
	setIsLoading: (isLoading: boolean) => void;
	setUser: (user: User) => void;
}

const useSessionStore = create<UseSessionStore>(set => ({
	isInitialized: true,
	isLoading: false,
	user: null,
	setIsInitialized: (isInitialized: boolean) => set({ isInitialized }),
	setIsLoading: (isLoading: boolean) => set({ isLoading }),
	setUser: (user: User) => set({ user }),
}));

export { useSessionStore };
