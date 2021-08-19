import { ReactElement, ReactNode } from 'react';
import { createUseStyles } from 'react-jss';

type Props = {
	children: ReactNode;
};

const useStyles = createUseStyles({
	root: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		justifyContent: 'center',
	},
});

function Centered({ children }: Props): ReactElement<Props> {
	const classes = useStyles();

	return <div className={classes.root}>{children}</div>;
}

export default Centered;
