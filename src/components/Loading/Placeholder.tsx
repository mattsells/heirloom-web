import { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';

import { Tangerine } from '@/variables/colors';
import { Size } from '@/variables/fonts';
import { Space } from '@/variables/space';

import Spinner from './Spinner';

type Props = {
	text?: string;
};

const useStyles = createUseStyles({
	root: {
		alignItems: 'center',
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},

	spinner: {
		marginBottom: Space.thick,
	},

	text: {
		color: Tangerine.regular,
		fontSize: Size.large,
	},
});

function Placeholder({ text }: Props): ReactElement<Props> {
	const classes = useStyles();
	const { t } = useTranslation();

	const displayText = text || t('global.loading');

	return (
		<div className={classes.root}>
			<div className={classes.spinner}>
				<Spinner />
			</div>

			<span className={classes.text}>{displayText}</span>
		</div>
	);
}

export default Placeholder;
