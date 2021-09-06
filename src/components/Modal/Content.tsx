import { ReactElement, ReactNode } from 'react';
import { createUseStyles } from 'react-jss';

import { Space } from '@/variables/space';

type Props = {
	children: ReactNode;
};

const useStyles = createUseStyles({
	root: {
		padding: `${Space.none} ${Space.thick} ${Space.thick} ${Space.thick}`,
	},
});

function Content(props: Props): ReactElement<Props> {
	const classes = useStyles();

	return <div className={classes.root} {...props} />;
}

export default Content;
