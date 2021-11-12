import { HTMLProps, ReactElement,useRef } from 'react';
import { createUseStyles } from 'react-jss';

import * as Input from '@/components/Input';
import Label from '@/components/Label';
import { Error } from '@/components/Text';
import { randomId } from '@/utils/string';
import { Space } from '@/variables/space';

export type Props = HTMLProps<HTMLInputElement> & {
	error?: string;
	label: string;
	name?: string;
	touched?: boolean;
};

const useStyles = createUseStyles(
	{
		root: {
			'&:not(:last-child)': {
				marginBottom: Space.thick,
			},
		},
		input: {
			marginBottom: Space.narrow,
		},
	},
	{ name: 'InputGroup' }
);

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
				<Input.Text
					error={errorMessage}
					id={id.current}
					name={name}
					{...props}
				/>
			</div>

			{errorMessage && <Error>{errorMessage}</Error>}
		</div>
	);
}

export default InputGroup;
