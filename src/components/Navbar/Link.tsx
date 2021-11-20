import classNames from 'classnames';
import { ReactElement } from 'react';
import { Link as BrowserLink, useRouteMatch } from 'react-router-dom';

type Props = {
	icon: ReactElement;
	label: string;
	to: string;
};
function Link({ icon, label, to }: Props): ReactElement {
	const isActive = !!useRouteMatch({ path: to });

	return (
		<li
			className={classNames(
				'bg-green-200',
				'border-b',
				'border-green-400',
				'border-solid',
				'duration-100',
				'ease-linear',
				'h-full',
				'hover:bg-green-400',
				'leading-none',
				'transition-colors',
				{
					'bg-green-300': isActive,
				}
			)}
		>
			<BrowserLink
				className="items-center flex flex-col p-4 no-underline text-green-800"
				to={to}
			>
				<div className="text-4xl">{icon}</div>
				<div className="text-sm">
					<span>{label}</span>
				</div>
			</BrowserLink>
		</li>
	);
}

export default Link;
