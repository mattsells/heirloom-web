import { ReactElement, SyntheticEvent } from 'react';
import { createUseStyles } from 'react-jss';

import { Size } from '@/variables/fonts';

import Text from './Text';
import { Space } from '@/variables/space';

type ListStyle = 'bullet' | 'number';

type Props = {
	error?: string;
	listStyle?: ListStyle;
	name: string;
	onBlur: any;
	onChange: (list: string[]) => void;
	value: string[];
};

const useStyles = createUseStyles({
	root: {},

	item: {
		fontSize: Size.regular,
		marginBottom: Space.thin,
	},
});

function List({
	error,
	name,
	onBlur,
	onChange,
	value: items,
}: Props): ReactElement<Props> {
	const classes = useStyles();

	const handleChangeItem = (index: number, value: string) => {
		const newList = [...items];
		newList[index] = value;

		onChange(newList);
	};

	const allItems = [...items, ''];

	// TODO: Fix TS stuff
	return (
		<ol>
			{allItems.map((item, index) => (
				<li className={classes.item} key={index}>
					<Text
						error={error}
						key={index}
						name={!index ? name : `${name}-${index}`}
						onBlur={onBlur}
						onChange={(e: SyntheticEvent<HTMLInputElement>) =>
							handleChangeItem(index, (e.target as HTMLInputElement).value)
						}
						value={item}
					/>
				</li>
			))}
		</ol>
	);
}

export default List;
