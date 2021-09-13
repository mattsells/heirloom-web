import { ReactElement, ReactNode } from 'react';
import { createUseStyles } from 'react-jss';

import { Radius } from '@/variables/borders';
import { Shade } from '@/variables/colors';
import { Shadow } from '@/variables/shadows';

type Size = 'auto' | 'regular';

type Props = {
	children: ReactNode;
	isFlex?: boolean;
	isFloating?: boolean;
	size?: Size;
};

const REGULAR_WIDTH = '500px';

function parseSize(size: Size = 'auto'): string {
	switch (size) {
		case 'regular':
			return REGULAR_WIDTH;

		default:
			return 'auto';
	}
}

const useStyles = createUseStyles(
	{
		root: (props: Partial<Props>) => ({
			backgroundColor: Shade.offwhite,
			borderRadius: Radius.regular,
			minWidth: parseSize(props.size),
			...(props.isFloating && {
				boxShadow: Shadow.regular,
			}),
			...(props.isFlex && {
				display: 'flex',
				flex: 1,
				flexDirection: 'column',
			}),
		}),
	},
	{ name: 'PanelFrame' }
);

function Frame({ children, ...props }: Props): ReactElement<Props> {
	const classes = useStyles(props as any);

	return <div className={classes.root}>{children}</div>;
}

export default Frame;
