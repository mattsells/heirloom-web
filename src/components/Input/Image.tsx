import { ChangeEvent, ReactElement, useRef, useState } from 'react';
import { BsImageFill } from 'react-icons/bs';
import { createUseStyles } from 'react-jss';

import { randomId } from '@/utils/string';
import { Pattern, Radius, Width } from '@/variables/borders';
import { Forest, Shade } from '@/variables/colors';
import { Size } from '@/variables/fonts';
import { Space } from '@/variables/space';

type Props = {
	onChange?: (data: object) => void;
	originalUrl?: string;
	text: string;
	value?: object;
};

const useStyles = createUseStyles({
	root: (imageUrl) => ({
		alignItems: 'center',
		backgroundColor: Shade.white,
		borderRadius: Radius.narrow,
		display: 'flex',
		color: Shade.white,
		cursor: 'pointer',
		fontSize: Size.regular,
		justifyContent: 'center',
		minHeight: '25rem',
		width: '100%',

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
		display: (imageUrl) => (imageUrl ? 'none' : 'flex'),
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
});

// TODO: Create hook for upload functionality
function Image({ onChange, originalUrl, text, value }: Props): ReactElement {
	const [imageUrl, setImageUrl] = useState(originalUrl);

	const id = useRef(randomId());
	const classes = useStyles(imageUrl as any);

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

			const body = await response.json();
			onChange && onChange(body.data);

			// TODO: Get correct URL
			setImageUrl(`http://localhost:3000${body.url}`);
		} else {
			setImageUrl(originalUrl);
			onChange && onChange(null);
		}
	};

	return (
		<label className={classes.root} htmlFor={id.current}>
			<div className={classes.add}>
				<BsImageFill />
				<span className={classes.addText}>{text}</span>
			</div>

			<input
				className={classes.input}
				id={id.current}
				onChange={handleSelectFile}
				type="file"
			/>
		</label>
	);
}

export default Image;