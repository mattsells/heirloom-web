import { ReactElement, ReactNode } from 'react';
import { Redirect, Route } from 'react-router-dom';

import useSession from '@/hooks/useSession';

type Props = {
	children?: ReactNode;
	component?: () => ReactElement;
	exact?: boolean;
	path: string;
};

function Protected({ children, ...props }: Props) {
	const { isAuthenticated } = useSession();

	return (
		<Route {...props}>
			{isAuthenticated ? children : <Redirect to="/login" />}
		</Route>
	);
}

export default Protected;
