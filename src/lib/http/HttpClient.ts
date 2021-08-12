import { DEFAULT_API_HOST, DEFAULT_API_SCHEME } from './config';
import HttpError from './HttpError';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

class HttpClient {
	apiHost: string;
	apiScheme: string;
	authToken: string;
	headers: object;

	constructor() {
		this.apiHost = process.env.API_HOST || DEFAULT_API_HOST;
		this.apiScheme = process.env.API_SCHEME || DEFAULT_API_SCHEME;
		this.headers = this.createBaseHeaders();
	}

	clearToken() {
		this.authToken = null;
	}

	setToken(token: string) {
		this.authToken = token;
	}

	get(path: string) {
		return this.performRequest('GET', path);
	}

	private async performRequest(
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
			const data = await response.json();
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
		// TODO: If is full url, don't build
		return `${this.apiScheme}://${this.apiHost}${this.cleanPath(path)}`;
	}

	private cleanPath(path: string): string {
		return path.replace(/^\/|\/$/g, '');
	}
}

export default HttpClient;
