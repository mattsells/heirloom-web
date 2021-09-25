import { HTMLProps, ReactElement, ReactNode } from 'react';
import { createUseStyles } from 'react-jss';

import * as Frame from '@/components/Frame';
import { Pattern, Radius, Width } from '@/variables/borders';
import { Forest, Shade } from '@/variables/colors';
import { Size } from '@/variables/fonts';
import { Shadow } from '@/variables/shadows';
import { Speed } from '@/variables/transitions';

type Props = HTMLProps<HTMLButtonElement> & {
	children?: ReactNode;
};

const useStyles = createUseStyles(
	{
		root: {
			backgroundColor: Shade.white,
			border: `${Width.thick} ${Pattern.dashed} ${Forest.regular}`,
			borderRadius: Radius.narrow,
			boxShadow: Shadow.lightest,
			color: Shade.white,
			cursor: 'pointer',
			fontSize: Size.regular,
			transform: 'scale(0.98)',
			transition: `transform ${Speed.regular} linear, box-shadow ${Speed.regular} linear, background-color linear ${Speed.fast}`,

			'&:hover': {
				backgroundColor: Shade.offwhite,
				boxShadow: Shadow.light,
				transform: 'scale(1.0)',
			},
		},
	},
	{
		name: 'ButtonSquare',
	}
);

function Square({ children, ...props }: Props): ReactElement<Props> {
	const classes = useStyles();

	return (
		<button className={classes.root} {...props} type="button">
			<Frame.Square>{children}</Frame.Square>
		</button>
	);
}

export default Square;
