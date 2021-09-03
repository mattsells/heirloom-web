import { ReactElement, ReactNode } from 'react';
import { createUseStyles } from 'react-jss';

type Props = {
	children: ReactNode;
};

const useStyles = createUseStyles({
	root: {
		paddingTop: '100%',
		position: 'relative',
	},

	pane: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		top: 0,
	},
});

function Square({ children }: Props): ReactElement<Props> {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.pane}>{children}</div>
		</div>
	);
}

export default Square;
