import { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Tangerine } from '@/variables/colors';
import { Size } from '@/variables/fonts';

type Props = {
	children?: string;
};

const useStyles = createUseStyles(
	{
		root: {
			color: Tangerine.dark,
			fontSize: Size.small,
		},
	},
	{ name: 'TextError' }
);

function Error({ children }: Props): ReactElement<Props> {
	const classes = useStyles();

	return <span className={classes.root}>{children}</span>;
}

export default Error;
