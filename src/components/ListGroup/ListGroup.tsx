import { ReactElement, useRef } from 'react';

import List, { InputType, ListType } from '@/components/Input/List';
import Label from '@/components/Label';
import { Error } from '@/components/Text';
import { randomId } from '@/utils/string';

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

function ListGroup({
	error,
	label,
	touched,
	...props
}: Props): ReactElement<Props> {
	const id = useRef(randomId());

	const errorMessage = touched && error;

	return (
		<div className="mb-4 last:mb-0">
			<Label error={errorMessage} htmlFor={id.current}>
				{label}
			</Label>

			<div className="mb-2 pl-4">
				<List error={errorMessage} {...props} />
			</div>

			<div className="pl-3">
				{errorMessage && <Error>{errorMessage}</Error>}
			</div>
		</div>
	);
}

export default ListGroup;
