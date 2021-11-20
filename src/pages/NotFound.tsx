import { useTranslation } from 'react-i18next';

import * as Text from '@/components/Text';

function NotFound() {
	const { t } = useTranslation();

	return (
		<div className="flex items-center bg-green-300 h-full justify-center">
			<Text.Header>{t('not-found.title')}</Text.Header>
		</div>
	);
}

export default NotFound;
