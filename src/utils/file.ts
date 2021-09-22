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

// TODO: See if data object can be stored in Formik so these are not needed
export function parseFileUrl(stringData: string): string {
	try {
		const data = JSON.parse(stringData) as any;
		return data?.url || null;
	} catch (err) {
		// If json parse fails then no url is available
		return null;
	}
}

export function parseFileData(stringData: string): string {
	try {
		const data = JSON.parse(stringData) as any;
		return data?.data || null;
	} catch (err) {
		// If json parse fails then no data is available
		return null;
	}
}
