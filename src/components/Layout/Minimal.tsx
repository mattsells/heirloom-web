import { ReactElement, ReactNode } from 'react';
import { createUseStyles } from 'react-jss';

import { Mint } from '@/variables/colors';

type Props = {
	children: ReactNode;
};

const useStyles = createUseStyles(
	{
		root: {
			backgroundColor: Mint.light,
			backgroundImage: `linear-gradient(${Mint.light}, ${Mint.regular})`,
			height: '100%',
		},
	},
	{ name: 'LayoutMinimal' }
);

function Minimal({ children }: Props): ReactElement<Props> {
	const classes = useStyles();

	return <div className={classes.root}>{children}</div>;
}

export default Minimal;
