import { ReactElement, ReactNode } from 'react';
import { createUseStyles } from 'react-jss';

type Props = {
	children?: ReactNode;
	flex?: number;
};

const useStyles = createUseStyles(
	{
		root: (flex) => ({
			display: 'flex',
			...(flex && {
				flexGrow: flex,
			}),
		}),
	},
	{ name: 'LevelItem' }
);

function Item({ flex, ...props }: Props): ReactElement<Props> {
	const classes = useStyles(flex as any);

	return <div className={classes.root} {...props} />;
}

export default Item;
