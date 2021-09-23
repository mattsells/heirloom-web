class HttpError extends Error {
	status: number;

	constructor(status: number, message: string) {
		super(message);
		this.status = status;
	}

	get unauthorized() {
		return this.status === 401;
	}
}

export default HttpError;
