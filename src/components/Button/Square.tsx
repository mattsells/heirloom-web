import classNames from 'classnames';
import { ReactElement } from 'react';

import * as Frame from '@/components/Frame';

import { ButtonProps } from './types';

function Square({
	children,
	...props
}: ButtonProps): ReactElement<ButtonProps> {
	return (
		<button
			className={classNames(
				'bg-white',
				'border-2',
				'border-dashed',
				'border-green-400',
				'duration-100',
				'ease-linear',
				'hover:bg-gray-50',
				'hover:scale-100',
				'hover:shadow-lg',
				'rounded-lg',
				'scale-95',
				'shadow-md',
				'text-white',
				'transform',
				'transition'
			)}
			{...props}
		>
			<Frame.Square>{children}</Frame.Square>
		</button>
	);
}

export default Square;
