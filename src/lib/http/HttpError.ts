class HttpError extends Error {
	status: number;

	constructor(status: number, message: string) {
		super(message);
		this.status = status;
	}

	get isUnauthorized() {
		return this.status === 401;
	}

	get isNotFound() {
		return this.status === 404;
	}
}

export default HttpError;
