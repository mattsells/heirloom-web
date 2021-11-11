import { createUseStyles } from 'react-jss';

import * as LoadingIcons from '@/components/Loading';
import { Mint } from '@/variables';

const useStyles = createUseStyles(
	{
		root: {
			alignItems: 'center',
			backgroundColor: Mint.light,
			display: 'flex',
			height: '100%',
			justifyContent: 'center',
		},
	},
	{
		name: 'Loading',
	}
);

function Loading() {
	const styles = useStyles();

	return (
		<div className={styles.root}>
			<LoadingIcons.Spinner />
		</div>
	);
}

export default Loading;
