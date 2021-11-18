import { ReactElement, ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

function Minimal({ children }: Props): ReactElement<Props> {
	return <div className="bg-green-200 h-full">{children}</div>;
}

export default Minimal;
