import classnames from 'classnames';
import { ReactElement, ReactNode } from 'react';

type Size = 'auto' | 'regular';

type Props = {
	children: ReactNode;
	isFlex?: boolean;
	isFloating?: boolean;
	size?: Size;
};

const REGULAR_WIDTH = '500px';

function parseSize(size: Size = 'auto'): string {
	switch (size) {
		case 'regular':
			return REGULAR_WIDTH;

		default:
			return 'auto';
	}
}

function Frame({
	children,
	isFlex,
	isFloating,
	size,
}: Props): ReactElement<Props> {
	const classes = classnames('bg-gray-50', 'rounded-xl', 'w-full', {
		'flex flex-col flex-grow': isFlex,
		'shadow-lg': isFloating,
	});

	return (
		<div className={classes} style={{ maxWidth: parseSize(size) }}>
			{children}
		</div>
	);
}

export default Frame;
