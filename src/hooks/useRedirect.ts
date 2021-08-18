import { createElement, ReactElement } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';

import { useRedirectStore } from '@/stores/routing';

type UseRedirect = {
	redirect: ReactElement;
	redirectTo: (path: string) => void;
};

function useRedirect(): UseRedirect {
	const { path, setPath } = useRedirectStore();
	const match = useRouteMatch(path || '');

	const handleRedirect = (path: string) => {
		setPath(path);
	};

	const redirect = path ? createElement(Redirect, { to: path }) : null;

	// If the current location is the requested redirect path,
	// remove the redirect to prevent further url changes
	if (path && match) {
		setPath(null);
	}

	return {
		redirect,
		redirectTo: handleRedirect,
	};
}

export default useRedirect;
