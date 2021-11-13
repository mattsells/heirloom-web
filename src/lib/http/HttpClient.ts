import { RouteParams } from '@/types/api';
import { buildParams, cleanPath } from '@/utils/routing';

import {
	DEFAULT_API_HOST,
	DEFAULT_API_PATH,
	DEFAULT_API_SCHEME,
} from './config';
import HttpError from './HttpError';
import HttpResponse from './HttpResponse';
import RouteDirectory from './RouteDirectory';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

type RequestConfig = {
	body?: object | FormData;
	params?: RouteParams;
};

class HttpClient {
	private apiHost: string;
	private apiPath: string;
	private apiScheme: string;
	private authToken: string;
	private headers: object;
	private routes: RouteDirectory;

	constructor(routes?: RouteDirectory) {
		this.apiHost = process.env.REACT_APP_API_HOST || DEFAULT_API_HOST;
		this.apiPath = process.env.REACT_APP_API_PATH || DEFAULT_API_PATH;
		this.apiScheme = process.env.REACT_APP_API_SCHEME || DEFAULT_API_SCHEME;

		this.headers = this.createBaseHeaders();

		this.routes = routes || null;
	}

	clearToken() {
		this.authToken = null;
	}

	setToken(token: string) {
		this.authToken = token;
	}

	get<T = {}>(path: string, config?: RequestConfig) {
		return this.performRequest<T>('GET', path, config.params, config.body);
	}

	create<T = {}>(path: string, config?: RequestConfig) {
		return this.performRequest<T>('POST', path, config.params, config.body);
	}

	update<T = {}>(path: string, config?: RequestConfig) {
		return this.performRequest<T>('PATCH', path, config.params, config.body);
	}

	replace<T = {}>(path: string, config?: RequestConfig) {
		return this.performRequest<T>('PUT', path, config.params, config.body);
	}

	destroy(path: string, config?: RequestConfig) {
		return this.performRequest('DELETE', path, config.params, config.body);
	}

	private async performRequest<T>(
		method: HttpMethod,
		path: string,
		params: RouteParams,
		body: object | FormData
	): Promise<HttpResponse<T>> {
		// Set path from route directory if available
		if (RouteDirectory.isValidName(path) && this.routes) {
			path = this.routes.get(path);
		}

		const url = buildParams(this.buildUrl(path), params || {});

		const response = await fetch(url, {
			method,
			headers: {
				...this.headers,
				...(this.authToken && { Authorization: this.authToken }),
			},
			...(body && {
				body: body instanceof FormData ? body : JSON.stringify(body),
			}),
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

		// TODO: Conditionally add api path
		return `${this.apiScheme}://${this.apiHost}/${this.apiPath}/${cleanPath(
			path
		)}`;
	}
}

export default HttpClient;
