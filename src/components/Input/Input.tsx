import { FormEventHandler, HTMLProps, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Shade, Slate, Tangerine } from '@/variables/colors';
import { Width } from '@/variables/borders';
import { Size } from '@/variables/fonts';

type Props = HTMLProps<HTMLInputElement> & {
	error?: string;
	onChange?: FormEventHandler<HTMLInputElement>;
};

const useStyles = createUseStyles({
	root: (props: Props) => ({
		background: Shade.white,
		border: `${Width.thin} solid ${Slate.lightest}`,
		borderRadius: '6px',
		color: Slate.dark,
		fontSize: Size.regular,
		outline: 'none',
		padding: '8px',
		width: '100%',
		...(props.error && {
			background: Tangerine.lightest,
			borderColor: Tangerine.dark,
		}),
	}),
});

function Input({ type = 'text', ...props }: Props): ReactElement<Props> {
	const classes = useStyles(props as any);

	return <input className={classes.root} type={type} {...props} />;
}

export default Input;
