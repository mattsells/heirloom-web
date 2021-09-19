import { FileUploadResponse } from '@/types/file';

type FormInputEvent = {
	target: {
		name: string;
		value: string;
	};
};

export function generateInputEvent(
	name: string,
	value: string | object
): FormInputEvent {
	return {
		target: {
			name: name,
			value: typeof value === 'string' ? value : JSON.stringify(value),
		},
	};
}

export function parseImageUrl(stringData: string): string {
	try {
		const data = JSON.parse(stringData) as any;
		return data?.url || null;
	} catch (err) {
		// If json parse fails then no url is available
		return null;
	}
}
