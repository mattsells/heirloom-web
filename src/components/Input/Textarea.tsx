import classNames from 'classnames';
import { FormEventHandler, HTMLProps, ReactElement } from 'react';

type Props = HTMLProps<HTMLTextAreaElement> & {
	error?: string;
	onChange?: FormEventHandler<HTMLTextAreaElement>;
};

function Textarea({ error, ...props }: Props): ReactElement<Props> {
	return (
		<textarea
			className={classNames(
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
			{...props}
		/>
	);
}

export default Textarea;
