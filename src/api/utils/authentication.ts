export function createSessionBody(email: string, password: string): object {
	return {
		user: {
			email,
			password,
		},
	};
}
