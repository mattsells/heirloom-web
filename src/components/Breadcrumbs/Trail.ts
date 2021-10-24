type Path = {
	label: string;
	path?: string;
};

export type BreadcrumbsPath = Path[];

class Trail {
	paths: BreadcrumbsPath = [];

	drop(label: string, path?: string): Trail {
		this.paths.push({
			label,
			path,
		});

		return this;
	}
}

export function trail(): Trail {
	return new Trail();
}

export default Trail;
