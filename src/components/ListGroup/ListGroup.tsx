import { useRef, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import List, { ListType } from '@/components/Input/List';
import Label from '@/components/Label';
import { Error } from '@/components/Text';
import { Space } from '@/variables/space';
import { randomId } from '@/utils/string';

// TODO: Update TS for events
export type Props = {
	error?: string;
	label: string;
	name: string;
	onBlur: any;
	onChange: any;
	touched?: boolean;
	type: ListType;
	values: string[];
};

const useStyles = createUseStyles({
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
});

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
