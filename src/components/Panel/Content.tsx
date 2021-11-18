import { ReactElement, ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

function Content({ children }: Props): ReactElement<Props> {
	return <div className="p-6">{children}</div>;
}

export default Content;
