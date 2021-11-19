import { ReactElement, ReactNode } from 'react';

import Text from './Text';
import Textarea from './Textarea';

export type ListType = 'bullet' | 'number';
export type InputType = 'input' | 'textarea';

// TODO: Update ts for events
export type Props = {
	error?: string;
	inputType?: InputType;
	listType?: ListType;
	name: string;
	onBlur: any;
	onChange: any;
	values: string[];
};

function List({
	error,
	inputType = 'input',
	listType = 'bullet',
	name,
	values,
	...props
}: Props): ReactElement<Props> {
	const allItems = [...values, ''];

	const InputComponent = inputType === 'input' ? Text : Textarea;

	return (
		<ListWrapper type={listType}>
			{allItems.map((item, index) => (
				<li className="text-base mb-2" key={index}>
					<InputComponent
						error={error}
						key={index}
						name={`${name}.${index}`}
						value={item}
						{...props}
					/>
				</li>
			))}
		</ListWrapper>
	);
}

type ListWrapperProps = {
	children: ReactNode;
	type?: ListType;
};

function ListWrapper({ children, type }: ListWrapperProps) {
	return type === 'number' ? <ol>{children}</ol> : <ul>{children}</ul>;
}

export default List;
