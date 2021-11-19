import classNames from 'classnames';
import { ReactElement, ReactNode } from 'react';

type Props = {
	arrangement: 'end' | 'split';
	children?: ReactNode;
};

function Base({ arrangement, ...props }: Props): ReactElement<Props> {
	return (
		<div
			className={classNames('flex w-full items-center', {
				'justify-between': arrangement === 'split',
				'justify-end': arrangement === 'end',
			})}
			{...props}
		/>
	);
}

export default Base;
