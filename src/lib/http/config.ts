export const DEFAULT_API_HOST = 'localhost:3000';
export const DEFAULT_API_PATH = 'v1';
export const DEFAULT_API_SCHEME = 'https';

export const RESPONSE_HEADERS = Object.freeze(['Authorization'] as const);

export type ResponseHeaders = Partial<
	Record<typeof RESPONSE_HEADERS[number], string>
>;
