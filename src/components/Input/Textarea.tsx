import { FormEventHandler, HTMLProps, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Family, Shade, Size, Slate, Tangerine, Width } from '@/variables';

type Props = HTMLProps<HTMLTextAreaElement> & {
	error?: string;
	onChange?: FormEventHandler<HTMLTextAreaElement>;
};

const useStyles = createUseStyles(
	{
		root: (props: Props) => ({
			background: Shade.white,
			border: `${Width.thin} solid ${Slate.lightest}`,
			borderRadius: '6px',
			color: Slate.dark,
			fontFamily: Family.primary,
			fontSize: Size.regular,
			outline: 'none',
			padding: '8px',
			width: '100%',
			...(props.error && {
				borderColor: Tangerine.dark,
			}),
		}),
	},
	{ name: 'InputTextarea' }
);

function Textarea(props: Props): ReactElement<Props> {
	const classes = useStyles(props as any);

	return <textarea className={classes.root} {...props} />;
}

export default Textarea;
