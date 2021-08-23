import { HTMLProps, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Radius } from '@/variables/borders';
import { Forest, Shade } from '@/variables/colors';
import { Size } from '@/variables/fonts';
import { Space } from '@/variables/space';
import { Speed } from '@/variables/transitions';

type Props = HTMLProps<HTMLButtonElement> & {
	children?: string;
};

const useStyles = createUseStyles({
	root: {
		backgroundColor: Forest.light,
		border: 'none',
		borderRadius: Radius.tight,
		cursor: 'pointer',
		color: Shade.white,
		fontSize: Size.regular,
		padding: `${Space.thin} ${Space.extraWide}`,
		transition: `background-color linear ${Speed.fast}`,

		'&:hover': {
			backgroundColor: Forest.regular,
		},
	},
});

function Submit(props: Props): ReactElement<Props> {
	const classes = useStyles();

	return <button className={classes.root} {...props} type="submit" />;
}

export default Submit;
