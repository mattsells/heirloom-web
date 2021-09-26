import { ReactElement, ReactNode } from 'react';
import { createUseStyles } from 'react-jss';
import { Link as BrowserLink } from 'react-router-dom';

import { Tangerine } from '@/variables/colors';
import { Size } from '@/variables/fonts';
import { Speed } from '@/variables/transitions';

type Props = {
	children?: ReactNode;
	onClick?: VoidFunction;
	to?: string;
};

const useStyles = createUseStyles(
	{
		root: {
			color: Tangerine.regular,
			fontSize: Size.regular,
			transition: `all linear ${Speed.fast}`,

			'&:hover': {
				color: Tangerine.light,
			},
		},
	},
	{ name: 'TextLink' }
);

function Link(props: Props): ReactElement<Props> {
	const classes = useStyles();

	if (props.onClick) {
		return (
			<a className={classes.root} {...props}>
				{props.children}
			</a>
		);
	}

	return (
		<BrowserLink className={classes.root} {...props} to={props.to as string} />
	);
}

export default Link;
