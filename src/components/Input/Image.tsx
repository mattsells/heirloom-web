import { ChangeEvent, HTMLProps, ReactElement, useMemo, useRef } from 'react';
import { BsImageFill } from 'react-icons/bs';
import { createUseStyles } from 'react-jss';

import * as Frame from '@/components/Frame';
import { FileUploadResponse } from '@/types/file';
import { randomId } from '@/utils/string';
import { Pattern, Radius, Width } from '@/variables/borders';
import { Forest, Shade } from '@/variables/colors';
import { Size } from '@/variables/fonts';
import { Space } from '@/variables/space';

import { generateInputEvent, parseFileUrl } from '@/utils/file';

export type Props = HTMLProps<HTMLInputElement> & {
	frame?: 'square';
	originalUrl?: string;
	text: string;
};

const useStyles = createUseStyles(
	{
		// @ts-ignore
		root: ({ frame, imageUrl }) => ({
			alignItems: 'center',
			backgroundColor: Shade.white,
			borderRadius: Radius.narrow,
			display: 'flex',
			color: Shade.white,
			cursor: 'pointer',
			fontSize: Size.regular,
			justifyContent: 'center',
			marginBottom: Space.thick,
			minHeight: '25rem',
			width: '100%',

			...(frame === 'square' && {
				height: '100%',
				minHeight: 'none',
			}),

			...(imageUrl && {
				backgroundImage: `url(${imageUrl})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center center',
				backgroundRepeat: 'no-repeat',
				border: 'none',
			}),

			...(!imageUrl && {
				border: `${Width.thick} ${Pattern.dashed} ${Forest.regular}`,
			}),
		}),

		input: {
			display: 'none',
		},

		add: {
			alignItems: 'center',
			color: Forest.light,
			// @ts-ignore
			display: ({ imageUrl }) => (imageUrl ? 'none' : 'flex'),
			flexDirection: 'column',
			height: '100%',
			justifyContent: 'center',

			'& > svg': {
				fontSize: Size.giant,
				marginBottom: Space.thin,
			},
		},

		addText: {
			fontSize: Size.regular,
		},
	},
	{ name: 'InputImage' }
);

// TODO: Create hook for upload functionality
function Image({
	frame,
	onChange,
	originalUrl,
	text,
	...props
}: Props): ReactElement {
	const imageUrl = useMemo(() => {
		const url = parseFileUrl(props.value as string);
		return url ? `http://localhost:3000${url}` : null;
	}, [props.value]);

	const id = useRef(randomId());
	const classes = useStyles({ frame, imageUrl } as any);

	const handleSelectFile = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files[0];

		if (file) {
			const form = new FormData();

			form.append('file', file);

			// TODO: Update api to take form data and specific upload endpoint
			const response = await fetch('http://localhost:3000/upload', {
				method: 'POST',
				body: form,
			});

			const body = (await response.json()) as FileUploadResponse;

			// TODO: Update typing here
			// @ts-ignore
			onChange(generateInputEvent(props.name, body));
		} else {
			// @ts-ignore
			onChange(generateInputEvent(props.name, ''));
		}
	};

	const input = (
		<label
			className={classes.root}
			data-testid="image-input"
			htmlFor={id.current}
		>
			<div className={classes.add}>
				<BsImageFill />
				<span className={classes.addText}>{text}</span>
			</div>

			<input
				accept="image/*"
				className={classes.input}
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
