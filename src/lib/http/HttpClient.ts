import qs from 'qs';

import {
	DEFAULT_API_HOST,
	DEFAULT_API_PATH,
	DEFAULT_API_SCHEME,
} from './config';
import HttpError from './HttpError';
import HttpResponse from './HttpResponse';

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

	get<T>(path: string, params?: object) {
		return this.performRequest<T>('GET', this.addQueryParams(path, params));
	}

	create<T>(path: string, data?: object) {
		return this.performRequest<T>('POST', path, data);
	}

	update<T>(path: string, data?: object) {
		return this.performRequest<T>('PATCH', path, data);
	}

	replace<T>(path: string, data?: object) {
		return this.performRequest<T>('PUT', path, data);
	}

	destroy(path: string) {
		return this.performRequest('DELETE', path);
	}

	private async performRequest<T>(
		method: HttpMethod,
		path: string,
		data?: object
	): Promise<HttpResponse<T>> {
		const url = this.buildUrl(path);

		const response = await fetch(url, {
			method,
			headers: {
				...this.headers,
				...(this.authToken && { Authorization: this.authToken }),
			},
			...(data && { body: JSON.stringify(data) }),
		});

		// Attempt to parse data from resposne
		let responseData;

		// Throw an error if body is not readable
		try {
			responseData = await response.json();
		} catch (err) {
			throw new HttpError(400, response.statusText);
		}

		// If successful response, return a response object with status and data
		if (response.ok) {
			const httpResponse = new HttpResponse<T>(responseData);

			httpResponse.status = response.status;
			httpResponse.parseHeaders(response.headers);

			return httpResponse;
		} else {
			// If error response, throw error with status and error from either the body
			// or default from response meta
			throw new HttpError(
				responseData.status || response.status,
				responseData.error || response.statusText
			);
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

	private addQueryParams(path: string, query?: object): string {
		if (!query) {
			return path;
		}

		const queryString = qs.stringify(query);

		return `${path}?${queryString}`;
	}
}

export default HttpClient;
