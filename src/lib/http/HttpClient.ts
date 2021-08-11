import { DEFAULT_API_HOST, DEFAULT_API_SCHEME } from './config';

class HttpClient {
	apiHost: string;
	apiScheme: string;
	authToken: string;

	constructor() {
		this.apiHost = process.env.API_HOST || DEFAULT_API_HOST;
		this.apiScheme = process.env.API_SCHEME || DEFAULT_API_SCHEME;
	}
}

export default HttpClient;
