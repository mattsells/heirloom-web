import { useRef, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import * as Input from '@/components/Input';
import Label from '@/components/Label';
import { Error } from '@/components/Text';
import { Space } from '@/variables/space';
import { randomId } from '@/utils/string';

type ListGroupType = 'bulleted' | 'numbered';

export type Props = {
	error?: string;
	label: string;
	name?: string;
	onBlur: any;
	onChange: (value: string[]) => void;
	touched?: boolean;
	type: ListGroupType;
	value: string[];
};

const useStyles = createUseStyles({
	root: {
		'&:not(:last-child)': {
			marginBottom: Space.thick,
		},
	},

	input: {
		marginBottom: Space.narrow,
		paddingLeft: Space.thick,
	},

	error: {
		paddingLeft: Space.thick,
	},
});

function ListGroup({
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
				<Input.List error={errorMessage} name={name} {...props} />
			</div>

			<div className={classes.error}>
				{errorMessage && <Error>{errorMessage}</Error>}
			</div>
		</div>
	);
}

export default ListGroup;
