import { FormEventHandler, HTMLProps, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Shade, Slate, Tangerine } from '@/variables/colors';
import { Width } from '@/variables/borders';
import { Size } from '@/variables/fonts';

import Text from './Text';

type ListStyle = 'bullet' | 'number';

type Props = {
	error?: string;
	listStyle?: ListStyle;
	onChange: (list: string[]) => void;
	value: string[];
};

const useStyles = createUseStyles({
	root: {},
});

function List({ error, onChange, value: items }: Props): ReactElement<Props> {
	const classes = useStyles();

	const handleChangeItem = (index: number, value: string) => {
		const newList = [...items];
		newList[index] = value;

		onChange(newList);
	};

	return (
		<ol>
			{items.map((item, index) => (
				<li key={index}>
					<Text key={index} value={item} />
				</li>
			))}
		</ol>
	);
}

export default List;
