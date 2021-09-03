import { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Mint } from '@/variables/colors';
import { Shadow } from '@/variables/shadows';

import { NAVBAR_ITEMS } from './config';
import Link from './Link';

const useStyles = createUseStyles({
	root: {
		backgroundColor: Mint.regular,
		boxShadow: Shadow.right,
		height: '100%',
	},
});

function Navbar(): ReactElement {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<ul>
				{NAVBAR_ITEMS.map(({ icon: Icon, ...props }, index) => (
					<Link {...props} icon={<Icon />} key={index} />
				))}
			</ul>
		</div>
	);
}

export default Navbar;
