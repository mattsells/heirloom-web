import { ReactElement, ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

function Square({ children }: Props): ReactElement<Props> {
	return (
		<div className="relative" style={{ paddingTop: '100%' }}>
			<div className="absolute top-0 left-0 bottom-0 right-0">{children}</div>
		</div>
	);
}

export default Square;
