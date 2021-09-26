import { ReactElement, ReactNode } from 'react';
import { createUseStyles } from 'react-jss';

import { Size } from '@/variables/fonts';

import Text from './Text';
import { Space } from '@/variables/space';

export type ListType = 'bullet' | 'number';

// TODO: Update ts for events
export type Props = {
	error?: string;
	name: string;
	onBlur: any;
	onChange: any;
	type?: ListType;
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
	type,
	name,
	values,
	...props
}: Props): ReactElement<Props> {
	const classes = useStyles();

	const allItems = [...values, ''];

	return (
		<ListWrapper type={type}>
			{allItems.map((item, index) => (
				<li className={classes.item} key={index}>
					<Text
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

function ListWrapper({ children, type = 'bullet' }: ListWrapperProps) {
	return type === 'bullet' ? <ol>{children}</ol> : <ul>{children}</ul>;
}

export default List;
