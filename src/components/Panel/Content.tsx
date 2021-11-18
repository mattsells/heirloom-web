import { ReactElement, ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

function Content({ children }: Props): ReactElement<Props> {
	return <div className="p-7">{children}</div>;
}

export default Content;
