import { Fragment, ReactElement } from 'react';
import { BsCaretRightFill } from 'react-icons/bs';
import { createUseStyles } from 'react-jss';

import Link from '@/components/Link';
import * as Text from '@/components/Text';
import { Size, Slate, Space } from '@/variables';

type Path = {
	label: string;
	path?: string;
};

export type BreadcrumbsPath = Path[];

type Props = {
	path: BreadcrumbsPath;
};

const useStyles = createUseStyles({
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
});

function Breadcrumbs({ path }: Props): ReactElement<Props> {
	const classes = useStyles();

	const links = path.map((link, index) => {
		return (
			<Fragment key={index}>
				<span>
					{link.path ? (
						<Link to={link.path}>{link.label}</Link>
					) : (
						<Text.Body>{link.label}</Text.Body>
					)}
				</span>

				{index < path.length - 1 && (
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
