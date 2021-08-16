import { RESPONSE_HEADERS, ResponseHeaders } from './config';

class HttpResponse<T = {}> {
	data: T;
	status: number;
	headers: ResponseHeaders;

	constructor(data: T) {
		this.data = data;
		this.status = 200;
		this.headers = {};
	}

	parseHeaders(headers: Headers) {
		this.headers = RESPONSE_HEADERS.reduce((h, k) => {
			const value = headers.get(k);
			return {
				...h,
				...(value && { [k]: headers.get(k) }),
			};
		}, {});
	}
}

export default HttpResponse;
