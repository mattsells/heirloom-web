import classNames from 'classnames';
import { ReactElement, ReactNode } from 'react';

type Props = {
	arrangement: 'split';
	children?: ReactNode;
};

function Base({ arrangement, ...props }: Props): ReactElement<Props> {
	return (
		<div
			className={classNames('flex', {
				'justify-between': arrangement === 'split',
			})}
			{...props}
		/>
	);
}

export default Base;
