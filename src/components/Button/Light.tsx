import classnames from 'classnames';
import { HTMLProps, ReactElement } from 'react';

type Props = HTMLProps<HTMLButtonElement> & {
	children?: string;
};

function Destructive(props: Props): ReactElement<Props> {
	return (
		<button
			className={classnames(
				'bg-gray-50',
				'border-none',
				'disabled:opacity-50',
				'duration-75',
				'hover:text-red-600',
				'px-4',
				'py-1',
				'rounded-md',
				'text-base',
				'text-red-500',
				'text-white',
				'transition-all'
			)}
			{...props}
			type="button"
		/>
	);
}

export default Destructive;
