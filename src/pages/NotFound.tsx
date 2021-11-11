import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';

import * as Text from '@/components/Text';

const useStyles = createUseStyles(
	{
		root: {
			alignItems: 'center',
			display: 'flex',
			flex: 1,
			justifyContent: 'center',
		},
	},
	{
		name: 'NotFound',
	}
);

function NotFound() {
	const { t } = useTranslation();

	const styles = useStyles();

	return (
		<div className={styles.root}>
			<Text.Header>{t('not-found.title')}</Text.Header>
		</div>
	);
}

export default NotFound;
