import { ReactElement,useRef } from 'react';
import { createUseStyles } from 'react-jss';

import List, { InputType, ListType } from '@/components/Input/List';
import Label from '@/components/Label';
import { Error } from '@/components/Text';
import { randomId } from '@/utils/string';
import { Space } from '@/variables/space';

// TODO: Update TS for events
export type Props = {
	error?: string;
	inputType?: InputType;
	label: string;
	listType?: ListType;
	name: string;
	onBlur: any;
	onChange: any;
	touched?: boolean;
	values: string[];
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
			paddingLeft: Space.wide,
		},

		error: {
			paddingLeft: Space.thick,
		},
	},
	{ name: 'ListGroup' }
);

function ListGroup({
	error,
	label,
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
				<List error={errorMessage} {...props} />
			</div>

			<div className={classes.error}>
				{errorMessage && <Error>{errorMessage}</Error>}
			</div>
		</div>
	);
}

export default ListGroup;
