import qs from 'qs';

interface RouteParams {
	[key: string]: string | number | RouteParams;
}

export function route(path: string, params: RouteParams = {}): string {
	for (const [key, value] of Object.entries(params)) {
		const keyMark = `:${key}`;

		if (path.indexOf(keyMark) !== -1 && typeof value !== 'object') {
			path = path.replace(
				keyMark,
				typeof value === 'number' ? value.toString() : value
			);
			delete params[key];
		}
	}

	const query = qs.stringify(params);

	return path + (query ? `?${query}` : '');
}
