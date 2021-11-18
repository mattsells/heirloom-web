import { ReactElement, ReactNode } from 'react';

type Props = {
	children: ReactNode;
	ratio: number;
};

function Square({ children, ratio }: Props): ReactElement<Props> {
	return (
		<div className="relative" style={{ paddingTop: `${ratio * 100}%` }}>
			<div className="absolute top-0 right-0 bottom-0 left-0">{children}</div>
		</div>
	);
}

export default Square;
