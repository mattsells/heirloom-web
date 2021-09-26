import { ReactElement, ReactNode } from 'react';
import { createUseStyles } from 'react-jss';

import { Slate } from '@/variables/colors';
import { Size } from '@/variables/fonts';

type Props = {
	children?: ReactNode;
};

const useStyles = createUseStyles(
	{
		root: {
			color: Slate.regular,
			fontSize: Size.regular,
		},
	},
	{ name: 'TextBody' }
);

function Body({ children }: Props): ReactElement<Props> {
	const classes = useStyles();

	return <p className={classes.root}>{children}</p>;
}

export default Body;
