import { ReactElement, ReactNode } from 'react';

type Props = {
	children?: ReactNode;
};

function Body({ children }: Props): ReactElement<Props> {
	return <p className="text-base text-gray-600">{children}</p>;
}

export default Body;
