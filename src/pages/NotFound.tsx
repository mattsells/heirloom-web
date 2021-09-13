import { useTranslation } from 'react-i18next';

import * as Text from '@/components/Text';

function NotFound() {
	const { t } = useTranslation();

	return <Text.Header>{t('not-found.title')}</Text.Header>;
}

export default NotFound;
