import classnames from 'classnames';
import { HTMLProps, ReactElement } from 'react';

type Props = HTMLProps<HTMLLabelElement> & {
	error?: string;
};

function Label({ type = 'text', error, ...props }: Props): ReactElement<Props> {
	return (
		<label
			className={classnames('text-gray-500', 'block', 'text-base', 'mb-1', {
				'text-red-500': error,
			})}
			{...props}
		/>
	);
}

export default Label;
