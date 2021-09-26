import { ReactElement, ReactNode } from 'react';
import { createUseStyles } from 'react-jss';

import { Size } from '@/variables/fonts';

import Text from './Text';
import Textarea from './Textarea';
import { Space } from '@/variables/space';

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

const useStyles = createUseStyles(
	{
		root: {},

		item: {
			fontSize: Size.regular,
			marginBottom: Space.thin,
		},
	},
	{ name: 'InputList' }
);

function List({
	error,
	inputType = 'input',
	listType = 'bullet',
	name,
	values,
	...props
}: Props): ReactElement<Props> {
	const classes = useStyles();

	const allItems = [...values, ''];

	const InputComponent = inputType === 'input' ? Text : Textarea;

	return (
		<ListWrapper type={listType}>
			{allItems.map((item, index) => (
				<li className={classes.item} key={index}>
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
