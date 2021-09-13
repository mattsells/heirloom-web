import { ReactElement, ReactNode } from 'react';
import { createUseStyles } from 'react-jss';

import { Space } from '@/variables/space';

type Props = {
	children: ReactNode;
};

const useStyles = createUseStyles(
	{
		root: {
			padding: Space.thick,
		},
	},
	{ name: 'PanelContent' }
);

function Content({ children }: Props): ReactElement<Props> {
	const classes = useStyles();

	return <div className={classes.root}>{children}</div>;
}

export default Content;
