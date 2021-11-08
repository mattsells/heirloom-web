export type IDParams = {
	id: string;
};

export type IndexResponse<T> = T & {
	meta: {
		total: number;
		currentPage: number;
		nextPage: number | null;
	};
};
