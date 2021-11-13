const charCodes: string[] = [];

for (let i = 0; i < 10; i++) {
	charCodes.push(String.fromCharCode(48 + i));
}

for (let i = 0; i < 26; i++) {
	charCodes.push(String.fromCharCode(97 + i));
}

export function randomId(length = 10): string {
	let string = '';

	for (let i = 0; i < length; i++) {
		string += charCodes[Math.floor(Math.random() * charCodes.length)];
	}

	return string;
}

export function combine(...args: string[]): string {
	return args.join(' ');
}

export function toSnakeCase(string: string): string {
	return string.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}
