import { Fragment, ReactElement } from 'react';
import { BsCaretRightFill } from 'react-icons/bs';
import { createUseStyles } from 'react-jss';

import Link from '@/components/Link';
import * as Text from '@/components/Text';
import { Size, Slate, Space } from '@/variables';

import Trail, { BreadcrumbsPath } from './Trail';

type Props = {
	path: BreadcrumbsPath | Trail;
};

const useStyles = createUseStyles(
	{
		root: {
			alignItems: 'center',
			display: 'flex',
			fontSize: Size.regular,
		},

		caret: {
			alignItems: 'center',
			color: Slate.regular,
			display: 'inline-flex',
			padding: `0 ${Space.regular}`,
		},
	},
	{
		name: 'Breadcrumbs',
	}
);

function Breadcrumbs({ path }: Props): ReactElement<Props> {
	const classes = useStyles();

	const breadcrumbPath = path instanceof Trail ? path.paths : path;

	const links = breadcrumbPath.map((link, index) => {
		return (
			<Fragment key={index}>
				<span>
					{link.path ? (
						<Link to={link.path}>{link.label}</Link>
					) : (
						<Text.Body>{link.label}</Text.Body>
					)}
				</span>

				{index < breadcrumbPath.length - 1 && (
					<span className={classes.caret}>
						<BsCaretRightFill />
					</span>
				)}
			</Fragment>
		);
	});

	return <div className={classes.root}>{links}</div>;
}

export default Breadcrumbs;
