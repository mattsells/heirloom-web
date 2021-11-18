import classnames from 'classnames';
import { FormEventHandler, HTMLProps, ReactElement } from 'react';

type Props = HTMLProps<HTMLInputElement> & {
	error?: string;
	onChange?: FormEventHandler<HTMLInputElement>;
};

function Text({ type = 'text', error, ...props }: Props): ReactElement<Props> {
	return (
		<input
			className={classnames(
				'bg-white',
				'border-2',
				'border-gray-100',
				'outline-none',
				'p-2',
				'rounded',
				'text-base',
				'text-gray-500',
				'w-full',
				{
					'bg-red-200': error,
					'border-red-300': error,
				}
			)}
			type={type}
			{...props}
		/>
	);
}

export default Text;
