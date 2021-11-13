import { RouteParams } from '@/types/api';
import { buildParams, cleanPath } from '@/utils/routing';
import { toSnakeCase } from '@/utils/string';

type PathList = {
	[k: string]: string;
};

class RouteDirectory {
	paths: PathList;

	constructor() {
		this.paths = {};
	}

	add(name: string, path?: string): void {
		const cleanName = cleanPath(name);

		if (name in this.paths) {
			throw new Error('Path name already defined: ' + cleanName);
		}

		if (!RouteDirectory.isValidName(name)) {
			throw new Error('Invalid path name: ' + cleanName);
		}

		this.paths[cleanPath(name)] = path
			? `/${cleanPath(path)}`
			: `/${toSnakeCase(cleanName)}`;
	}

	get(name: string, params?: RouteParams): string {
		let path = this.paths[name];

		if (!path) {
			throw new Error('Path not declared: ' + name);
		}

		if (params) {
			path = buildParams(path, params);
		}

		return path;
	}

	public static isValidName(key: string): boolean {
		return /^[a-zA-Z]+(\.[a-zA-Z]+)*$/.test(key);
	}
}

export default RouteDirectory;
