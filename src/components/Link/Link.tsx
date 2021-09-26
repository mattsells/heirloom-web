import { ReactElement, ReactNode } from 'react';
import { createUseStyles } from 'react-jss';
import { Link as RouterLink } from 'react-router-dom';

import { Sea } from '@/variables/colors';
import { Speed } from '@/variables/transitions';

type Props = {
	children?: ReactNode;
	onClick?: VoidFunction;
	to: string;
};

const useStyles = createUseStyles(
	{
		root: {
			color: Sea.regular,
			textDecoration: 'none',
			transition: `color linear ${Speed.fast}`,

			'&:hover': {
				color: Sea.dark,
			},
		},
	},
	{ name: 'Link' }
);

function Body({ children, onClick, to }: Props): ReactElement<Props> {
	const classes = useStyles();

	if (onClick) {
		return (
			<a className={classes.root} href={to} onClick={onClick}>
				{children}
			</a>
		);
	}

	return (
		<RouterLink className={classes.root} to={to}>
			{children}
		</RouterLink>
	);
}

export default Body;
