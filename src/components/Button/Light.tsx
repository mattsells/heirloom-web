import classnames from 'classnames';
import { ReactElement } from 'react';

import { ButtonProps } from './types';

function Destructive(props: ButtonProps): ReactElement<ButtonProps> {
	return (
		<button
			className={classnames(
				'bg-gray-50',
				'border-gray-100',
				'disabled:opacity-50',
				'duration-75',
				'ease-linear',
				'hover:text-red-600',
				'opacity-80',
				'px-4',
				'py-1',
				'rounded-md',
				'text-base',
				'text-red-500',
				'text-white',
				'transition-all'
			)}
			{...props}
		/>
	);
}

export default Destructive;
