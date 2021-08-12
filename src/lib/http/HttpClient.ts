import {
	DEFAULT_API_HOST,
	DEFAULT_API_PATH,
	DEFAULT_API_SCHEME,
} from './config';
import HttpError from './HttpError';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

class HttpClient {
	private apiHost: string;
	private apiPath: string;
	private apiScheme: string;
	private authToken: string;
	private headers: object;

	constructor() {
		this.apiHost = process.env.REACT_APP_API_HOST || DEFAULT_API_HOST;
		this.apiPath = process.env.REACT_APP_API_PATH || DEFAULT_API_PATH;
		this.apiScheme = process.env.REACT_APP_API_SCHEME || DEFAULT_API_SCHEME;

		this.headers = this.createBaseHeaders();
	}

	clearToken() {
		this.authToken = null;
	}

	setToken(token: string) {
		this.authToken = token;
	}

	get<T>(path: string) {
		return this.performRequest<T>('GET', path);
	}

	create(path: string, data?: BodyInit) {
		return this.performRequest('POST', path, data);
	}

	update(path: string, data?: BodyInit) {
		return this.performRequest('PATCH', path, data);
	}

	replace(path: string, data?: BodyInit) {
		return this.performRequest('PUT', path, data);
	}

	destroy(path: string) {
		return this.performRequest('DELETE', path);
	}

	private async performRequest<T = {}>(
		method: HttpMethod,
		path: string,
		data?: BodyInit
	) {
		const url = this.buildUrl(path);

		const response = await fetch(url, {
			method,
			headers: {
				...this.headers,
				...(this.authToken && { Authorization: this.authToken }),
			},
			...(data && { body: data }),
		});

		if (response.ok) {
			const data = (await response.json()) as T;
			return { data, status: response.status };
		} else {
			throw new HttpError(response.status, response.statusText);
		}
	}

	private createBaseHeaders() {
		return {
			'Content-Type': 'application/json',
			'Key-Inflection': 'camel',
		};
	}

	private buildUrl(path: string): string {
		if (path.includes('http')) {
			return path;
		}

		return `${this.apiScheme}://${this.apiHost}/${
			this.apiPath
		}/${this.cleanPath(path)}`;
	}

	private cleanPath(path: string): string {
		return path.replace(/^\/|\/$/g, '');
	}
}

export default HttpClient;
