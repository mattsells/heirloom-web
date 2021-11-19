import classNames from 'classnames';
import { ReactElement, ReactNode } from 'react';

type Props = {
	children?: ReactNode;
	isFull?: boolean;
};

function Item({ isFull, ...props }: Props): ReactElement<Props> {
	return (
		<div className={classNames('flex', { 'flex-grow': isFull })} {...props} />
	);
}

export default Item;
