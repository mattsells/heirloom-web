import { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Mint, Shade, Slate } from '@/variables/colors';
import { Size } from '@/variables/fonts';
import { Space } from '@/variables/space';
import { Speed } from '@/variables/transitions';

type Props = {
	icon: ReactElement;
	label: string;
	onClick?: VoidFunction;
};

const useStyles = createUseStyles(
	{
		root: {
			color: Slate.regular,
			height: '100%',
			lineHeight: '1',
			transition: `all linear ${Speed.fast}`,

			'&:hover': {
				backgroundColor: Mint.dark,
				color: Shade.lightGray,
			},
		},

		icon: {
			fontSize: '4.2rem',
		},

		label: {
			fontSize: Size.small,
		},

		content: {
			alignItems: 'center',
			background: 'none',
			border: 'none',
			color: 'inherit',
			display: 'flex',
			flexDirection: 'column',
			padding: Space.regular,
			textDecoration: 'none',
			width: '100%',
		},
	},
	{ name: 'NavbarBlock' }
);

function Block({ icon, label, onClick }: Props): ReactElement {
	const classes = useStyles();

	return (
		<li className={classes.root}>
			<button className={classes.content} onClick={onClick}>
				<div className={classes.icon}>{icon}</div>
				<div className={classes.label}>
					<span>{label}</span>
				</div>
			</button>
		</li>
	);
}

export default Block;
