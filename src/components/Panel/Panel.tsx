import { ReactElement, ReactNode } from 'react';
import { createUseStyles } from 'react-jss';

type Props = {
	children: ReactNode;
	isFloating?: boolean;
};

const useStyles = createUseStyles({
	root: {
		backgroundColor: 'red',
	},
});

function Panel({ children, ...props }: Props): ReactElement<Props> {
	const classes = useStyles();

	return <div className={classes.root}>{children}</div>;
}

export default Panel;
