import { ReactElement, ReactNode } from 'react';
import { createUseStyles } from 'react-jss';

type Props = {
	arrangement: 'split';
	children?: ReactNode;
};

const useStyles = createUseStyles(
	{
		root: (arrangement) => ({
			display: 'flex',
			...((arrangement as any) === 'split' && {
				justifyContent: 'space-between',
			}),
		}),
	},
	{ name: 'LevelBase' }
);

function Base({ arrangement, ...props }: Props): ReactElement<Props> {
	const classes = useStyles(arrangement as any);

	return <div className={classes.root} {...props} />;
}

export default Base;
