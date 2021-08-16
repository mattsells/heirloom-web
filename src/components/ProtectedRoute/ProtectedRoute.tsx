import { ReactNode } from 'react';
import { Redirect, Route } from 'react-router-dom';

import useSession from '@/hooks/useSession';

type Props = {
	children: ReactNode;
	path: string;
};

function ProtectedRoute({ children, ...props }: Props) {
	const { isAuthenticated } = useSession();

	return (
		<Route {...props}>
			{isAuthenticated ? children : <Redirect to="/login" />}
		</Route>
	);
}

export default ProtectedRoute;
