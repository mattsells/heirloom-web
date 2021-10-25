import { HTMLProps, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Radius, Shade, Size, Slate, Space, Speed } from '@/variables';

type Theme = 'primary' | 'secondary' | 'destructive' | 'light';

type Props = HTMLProps<HTMLButtonElement> & {
	children?: string;
	theme: Theme;
};

function getTheme(theme: Theme) {
	switch (theme) {
		case 'light':
			return {
				backgroundColor: Shade.offwhite,
				border: Shade.lightGray,
				color: Slate.regular,
				opacity: 0.8,

				'&:not(:disabled)': {
					'&:hover': {
						backgroundColor: Shade.lightGray,
						opacity: 0.9,
					},
				},
			};

		default:
			return {};
	}
}

const useStyles = createUseStyles(
	{
		root: (theme: Theme) => ({
			borderRadius: Radius.tight,
			cursor: 'pointer',
			fontSize: Size.regular,
			padding: `${Space.thin} ${Space.extraWide}`,
			transition: `all linear ${Speed.fast}`,

			'&:disabled': {
				cursor: 'default',
				opacity: 0.5,
			},

			...getTheme(theme),
		}),
	},
	{
		name: 'ButtonThemed',
	}
);

function Themed({ theme, ...rest }: Props): ReactElement<Props> {
	const classes = useStyles(theme as any);

	return <button className={classes.root} {...rest} type="button" />;
}

export default Themed;
