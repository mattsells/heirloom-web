import { ReactElement, ReactNode } from 'react';

import Navbar from '@/components/Navbar';

type Props = {
	children: ReactNode;
};

function Application({ children }: Props): ReactElement<Props> {
	return (
		<div className="application">
			<div className="application-nav">
				<Navbar />
			</div>

			<div className="application-content px-4">
				<div
					className="flex flex-col h-full m-auto"
					style={{ maxWidth: '1000px' }}
				>
					{children}
				</div>
			</div>
		</div>
	);
}

export default Application;
