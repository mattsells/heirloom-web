import { ReactElement, ReactNode } from 'react';
import { createUseStyles } from 'react-jss';

import Navbar from '@/components/Navbar';

type Props = {
	children: ReactNode;
};

const useStyles = createUseStyles({
	// TODO: Add media query for desktop vs mobile
	root: {
		display: 'grid',
		gridTemplateColumns: '14.0rem minmax(30.0rem, 100%)',
		gridTemplateRows: '1fr',
		gridTemplateAreas: `
			"nav content"
		`,
		height: '100%',
	},

	content: {
		gridArea: 'content',
		maxHeight: '100vh',
		overflowY: 'auto',
	},

	nav: {
		gridArea: 'nav',
	},

	container: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		margin: 'auto',
		maxWidth: '1000px',
	},
});

function Application({ children }: Props): ReactElement<Props> {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.nav}>
				<Navbar />
			</div>

			<div className={classes.content}>
				<div className={classes.container}>{children}</div>
			</div>
		</div>
	);
}

export default Application;
