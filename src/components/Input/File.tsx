import { Uppy } from '@uppy/core';
import { DragDrop } from '@uppy/react';
import XHRUpload from '@uppy/xhr-upload';
import { ReactElement } from 'react';

type Props = {
	onChange?: (url: string) => void;
	value?: string;
};

const uppy = new Uppy({
	restrictions: { maxNumberOfFiles: 1 },
	autoProceed: true,
});

// TODO: Use ENV for endpoint
uppy.use(XHRUpload, { endpoint: 'http://localhost.com:3000/images/upload' });

function File({ onChange, value }: Props): ReactElement {
	return <DragDrop uppy={uppy} />;
}

export default File;
