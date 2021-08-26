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
		gridTemplateColumns:
			'[nav-left] 14.0rem [nav-right] minmax(5.0rem, 1fr) [content-left] minmax(30.0rem, 100%) [content-right] minmax(5.0rem, 1fr) [layout-end]',
		gridTemplateRows: '[nav-top] 1fr [nav-bottom]',
		gridTemplateAreas: `
			"nav . content ."
		`,
		height: '100%',
	},

	content: {
		gridArea: 'content',
	},

	nav: {
		gridArea: 'nav',
	},
});

function Application({ children }: Props): ReactElement<Props> {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.nav}>
				<Navbar />
			</div>

			<div className={classes.content}>{children}</div>
		</div>
	);
}

export default Application;
