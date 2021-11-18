import { Fragment, ReactElement } from 'react';
import { BsCaretRightFill } from 'react-icons/bs';

import Link from '@/components/Link';
import * as Text from '@/components/Text';

import Trail, { BreadcrumbsPath } from './Trail';

type Props = {
	path: BreadcrumbsPath | Trail;
};

function Breadcrumbs({ path }: Props): ReactElement<Props> {
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
					<span className="inline-flex text-gray-600 px-2">
						<BsCaretRightFill />
					</span>
				)}
			</Fragment>
		);
	});

	return <div className="flex flex-row items-center text-base">{links}</div>;
}

export default Breadcrumbs;
