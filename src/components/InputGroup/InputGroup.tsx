import { HTMLProps, ReactElement, useRef } from 'react';

import * as Input from '@/components/Input';
import Label from '@/components/Label';
import { Error } from '@/components/Text';
import { randomId } from '@/utils/string';

export type Props = HTMLProps<HTMLInputElement> & {
	error?: string;
	label: string;
	name?: string;
	touched?: boolean;
};

function InputGroup({
	error,
	label,
	name,
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

			<div className="mb-1">
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
