import classNames from 'classnames';
import { ReactElement } from 'react';

import { ButtonProps } from './types';

function Destructive(props: ButtonProps): ReactElement<ButtonProps> {
	return (
		<button
			className={classNames(
				'bg-red-500',
				'border-none',
				'disabled:opacity-50',
				'duration-75',
				'ease-linear',
				'hover:bg-red-600',
				'px-4',
				'py-1',
				'rounded-md',
				'text-base',
				'text-white',
				'transition-all'
			)}
			{...props}
		/>
	);
}

export default Destructive;
