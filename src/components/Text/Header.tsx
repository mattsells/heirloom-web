import { createElement, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Slate, Tangerine } from '@/variables/colors';
import { Size } from '@/variables/fonts';
import { Space } from '@/variables/space';

type HeaderStyle = 'h1' | 'h2' | 'h3';

type Props = {
	as?: HeaderStyle;
	children?: string;
};

const useStyles = createUseStyles(
	{
		root: (as: HeaderStyle) => ({
			...(as === 'h1' && {
				color: Tangerine.light,
				fontSize: Size.giant,
				marginBottom: Space.regular,
			}),
			...(as === 'h2' && {
				color: Slate.dark,
				fontSize: Size.large,
				marginBottom: Space.thin,
			}),
			...(as === 'h3' && {
				color: Slate.darkest,
				fontSize: Size.regular,
			}),
		}),
	},
	{ name: 'TextHeader' }
);

function Header({ children, as = 'h1' }: Props): ReactElement<Props> {
	const classes = useStyles(as);

	return createElement(as, { as, className: classes.root }, children);
}

export default Header;
