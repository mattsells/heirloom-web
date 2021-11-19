import { ReactElement, ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

function Content(props: Props): ReactElement<Props> {
	return <div className="p-6 pt-0" {...props} />;
}

export default Content;
