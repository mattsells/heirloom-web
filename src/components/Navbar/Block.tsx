import classNames from 'classnames';
import { ReactElement } from 'react';

type Props = {
	icon: ReactElement;
	label: string;
	onClick?: VoidFunction;
};

function Block({ icon, label, onClick }: Props): ReactElement {
	return (
		<li
			className={classNames(
				'duration-100',
				'ease-linear',
				'h-full',
				'hover:bg-green-300',
				'leading-none',
				'text-green-800',
				'transition-colors'
			)}
		>
			<button
				className={classNames(
					'items-center',
					'bg-none',
					'border-none',
					'flex',
					'flex-col',
					'p-2',
					'no-underline',
					'w-full'
				)}
				onClick={onClick}
			>
				<div className="text-4xl">{icon}</div>
				<div className="text-sm">
					<span>{label}</span>
				</div>
			</button>
		</li>
	);
}

export default Block;
