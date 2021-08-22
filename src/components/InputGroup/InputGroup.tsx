import { useRef, HTMLProps, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import Input from '@/components/Input';
import Label from '@/components/Label';
import { Error } from '@/components/Text';
import { Space } from '@/variables/space';
import { randomId } from '@/utils/string';

export type Props = HTMLProps<HTMLInputElement> & {
	error?: string;
	label: string;
	name?: string;
	touched?: boolean;
};

const useStyles = createUseStyles({
	root: {
		'&:not(:last-child)': {
			marginBottom: Space.thick,
		},
	},
	input: {
		marginBottom: Space.narrow,
	},
});

function InputGroup({
	error,
	label,
	name,
	touched,
	...props
}: Props): ReactElement<Props> {
	const classes = useStyles(props as any);

	const id = useRef(randomId());

	const errorMessage = touched && error;

	return (
		<div className={classes.root}>
			<Label error={errorMessage} htmlFor={id.current}>
				{label}
			</Label>

			<div className={classes.input}>
				<Input error={errorMessage} id={id.current} name={name} {...props} />
			</div>

			{errorMessage && <Error>{errorMessage}</Error>}
		</div>
	);
}

export default InputGroup;
