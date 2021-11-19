import classNames from 'classnames';
import { ReactElement, ReactNode } from 'react';
import { GrFormClose } from 'react-icons/gr';

import * as Level from '@/components/Level';
import * as Panel from '@/components/Panel';
import Portal from '@/components/Portal';
import * as Text from '@/components/Text';

type Props = {
	children: ReactNode;
	isVisible: boolean;
	onDismiss: VoidFunction;
	title?: string;
};

// TODO: Close modal when clicking out of bounds
// TODO: Animate modal in/out
function Modal({
	children,
	isVisible,
	onDismiss,
	title,
}: Props): ReactElement<Props> {
	if (!isVisible) {
		return null;
	}

	return (
		<Portal>
			<div
				className={classNames(
					'flex',
					'items-center',
					'justify-center',
					'p-14',
					'fixed',
					'top-0',
					'right-0',
					'bottom-0',
					'left-0'
				)}
				style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
			>
				<div className="flex w-full" style={{ maxWidth: '800px' }}>
					<Panel.Frame isFlex isFloating>
						<div className="p-6 pb-2">
							<Level.Base arrangement={title ? 'split' : 'end'}>
								{title && (
									<Level.Item>
										<Text.Header as="h2">{title}</Text.Header>
									</Level.Item>
								)}
								<Level.Item>
									<button
										className="bg-none border-none p-1 text-4xl rounded-full bg-gray-100 hover:bg-gray-200"
										onClick={onDismiss}
									>
										<GrFormClose />
									</button>
								</Level.Item>
							</Level.Base>
						</div>

						<div className="overflow-y-auto">{children}</div>
					</Panel.Frame>
				</div>
			</div>
		</Portal>
	);
}

export default Modal;
