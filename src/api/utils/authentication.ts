export function createSessionBody(email: string, password: string): object {
	return {
		user: {
			email,
			password,
		},
	};
}

export function createRegistrationBody(
	email: string,
	password: string,
	passwordConfirmation: string
): object {
	return {
		user: {
			email,
			password,
			passwordConfirmation,
		},
	};
}
