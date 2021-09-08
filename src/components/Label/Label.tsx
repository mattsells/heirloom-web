import { HTMLProps, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Slate, Tangerine } from '@/variables/colors';
import { Size } from '@/variables/fonts';
import { Space } from '@/variables/space';

type Props = HTMLProps<HTMLLabelElement> & {
	error?: string;
};

const useStyles = createUseStyles({
	root: (props: Props) => ({
		color: Slate.regular,
		display: 'block',
		fontSize: Size.regular,
		marginBottom: Space.thin,
		...(props.error && {
			color: Tangerine.dark,
		}),
	}),
});

function Label({ type = 'text', ...props }: Props): ReactElement<Props> {
	const classes = useStyles(props as any);

	return <label className={classes.root} {...props} />;
}

export default Label;
