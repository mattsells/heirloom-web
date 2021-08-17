import create from 'zustand';

type UseRedirectStore = {
	path: string;
	setPath: (path: string) => void;
};

const useRedirectStore = create<UseRedirectStore>((set) => ({
	path: null,
	setPath: (path: string) => set({ path }),
}));

export { useRedirectStore };
