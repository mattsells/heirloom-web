import { ReactElement, ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

function Centered({ children }: Props): ReactElement<Props> {
	return (
		<div className="items-center flex flex-col h-full justify-center">
			{children}
		</div>
	);
}

export default Centered;
