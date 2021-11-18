import { ReactElement } from 'react';

type Props = {
	children?: string;
};

function Error({ children }: Props): ReactElement<Props> {
	return <span className="text-red-500 text-sm">{children}</span>;
}

export default Error;
