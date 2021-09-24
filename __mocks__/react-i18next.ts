export const useTranslation = jest.fn(() => ({
	t: (key) => key,
	i18n: {
		changeLanguage: () => new Promise(() => {}),
	},
}));
