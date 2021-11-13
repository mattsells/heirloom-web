import { GiSecretBook } from 'react-icons/gi';

import routes from '@/router/routes';

// TODO: Add i18n
export const NAVBAR_ITEMS = [
	// {
	// 	icon: GiTomato,
	// 	label: 'My Heirloom',
	// 	to: routes.home,
	// },
	{
		icon: GiSecretBook,
		label: 'Recipes',
		to: routes.get('recipes'),
	},
];
