export type FileDataStorage = 'cache' | 'store';

export type FileData = {
	id: string;
	metadata: {
		filename: string;
		mime_type: string;
		size: number;
	};
	storage: FileDataStorage;
};

export type FileUploadResponse = {
	data: FileData;
	url: string;
};
