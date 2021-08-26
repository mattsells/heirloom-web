import { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { Link as BrowserLink, useRouteMatch } from 'react-router-dom';

import { Pattern, Width } from '@/variables/borders';
import { Forest, Mint, Shade } from '@/variables/colors';
import { Size } from '@/variables/fonts';
import { Space } from '@/variables/space';
import { Speed } from '@/variables/transitions';

type Props = {
	icon: ReactElement;
	label: string;
	to: string;
};

const useStyles = createUseStyles({
	root: {
		backgroundColor: (isActive) => (isActive ? Forest.regular : Forest.light),
		height: '100%',
		lineHeight: '1',
		transition: `background-color linear ${Speed.fast}`,

		'&:hover': {
			backgroundColor: Forest.dark,
		},

		'&:not(:last-of-type)': {
			borderBottom: `${Width.thin} ${Pattern.solid} ${Mint.dark}`,
		},
	},

	icon: {
		fontSize: '4.2rem',
	},

	label: {
		fontSize: Size.small,
	},

	link: {
		alignItems: 'center',
		color: Shade.lightGray,
		display: 'flex',
		flexDirection: 'column',
		padding: Space.regular,
		textDecoration: 'none',
	},
});

function Link({ icon, label, to }: Props): ReactElement {
	const isActive = !!useRouteMatch({ path: to });

	const classes = useStyles(isActive as any);

	return (
		<li className={classes.root}>
			<BrowserLink className={classes.link} to={to}>
				<div className={classes.icon}>{icon}</div>
				<div className={classes.label}>
					<span>{label}</span>
				</div>
			</BrowserLink>
		</li>
	);
}

export default Link;
