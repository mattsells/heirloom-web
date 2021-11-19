import classNames from 'classnames';
import { ChangeEvent, HTMLProps, ReactElement, useMemo, useRef } from 'react';
import { BsImageFill } from 'react-icons/bs';

import * as Frame from '@/components/Frame';
import { FileUploadResponse } from '@/types/file';
import { generateInputEvent, parseFileUrl } from '@/utils/file';
import { randomId } from '@/utils/string';

export type Props = HTMLProps<HTMLInputElement> & {
	frame?: 'square';
	originalUrl?: string;
	text: string;
};

// TODO: Create hook for upload functionality
function Image({
	frame,
	onChange,
	originalUrl,
	text,
	...props
}: Props): ReactElement {
	const imageUrl = useMemo(() => {
		return parseFileUrl(props.value as string);
	}, [props.value]);

	const id = useRef(randomId());

	const handleSelectFile = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files[0];

		if (file) {
			const form = new FormData();

			form.append('file', file);

			// TODO: Update api to take form data and specific upload endpoint
			const response = await fetch(
				`${process.env.REACT_APP_API_SCHEME}://${process.env.REACT_APP_API_HOST}/upload`,
				{
					method: 'POST',
					body: form,
				}
			);

			const body = (await response.json()) as FileUploadResponse;

			// TODO: Update typing here
			// TODO: Use form context to send value not as a string
			// @ts-ignore
			onChange(generateInputEvent(props.name, body));
		} else {
			// @ts-ignore
			onChange(generateInputEvent(props.name, ''));
		}
	};

	const input = (
		<label
			className={classNames(
				'bg-white',
				'cursor-pointer',
				'flex',
				'h-full',
				'items-center',
				'justify-center',
				'mb-6',
				'rounded-sm',
				'text-base',
				'text-white',
				'w-full',
				{
					'border-dashed border-4 border-green-200': !imageUrl,
					'bg-center bg-cover bg-no-repeat border-none': imageUrl,
				}
			)}
			data-testid="image-input"
			htmlFor={id.current}
			style={{
				minHeight: '25vh',
				...(imageUrl && {
					backgroundImage: `url(${imageUrl})`,
				}),
			}}
		>
			<div
				className={classNames(
					'items-center',
					'text-green-400',
					'h-full',
					'justify-center',
					'flex-col',
					{
						hidden: imageUrl,
						flex: !imageUrl,
					}
				)}
				data-testid="input-image-display"
			>
				<div className="mb-2 text-4xl">
					<BsImageFill />
				</div>
				<span className="text-base">{text}</span>
			</div>

			<input
				accept="image/*"
				className="hidden"
				data-testid="file-input"
				id={id.current}
				onChange={handleSelectFile}
				type="file"
			/>
		</label>
	);

	if (!frame) {
		return input;
	}

	return <Frame.Square>{input}</Frame.Square>;
}

export default Image;
