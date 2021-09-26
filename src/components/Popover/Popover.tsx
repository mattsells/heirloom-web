import { useEffect } from 'react';
import { ReactElement, ReactNode, useState } from 'react';
import { usePopper } from 'react-popper';

import Portal from '@/components/Portal';

type Props = {
	children: ReactNode[];
	isVisible: boolean;
	offsetX?: number;
	offsetY?: number;
	// TODO: Get correct typing for this
	placement?: string;
};

function Popover({
	children,
	isVisible,
	offsetX,
	offsetY,
	placement = 'bottom',
}: Props): ReactElement<Props> {
	const [referenceElement, setReferenceElement] = useState(null);
	const [popperElement, setPopperElement] = useState(null);
	const [arrowElement, setArrowElement] = useState(null);

	const { styles, attributes, update } = usePopper(
		referenceElement,
		popperElement,
		{
			modifiers: [
				{ name: 'arrow', options: { element: arrowElement } },
				{ name: 'offset', options: { offset: [offsetY || 0, offsetX || 0] } },
			],
			// @ts-ignore - TODO: Remove this after correct typing added
			placement,
		}
	);

	useEffect(() => {
		if (update) {
			update();
		}
	}, [isVisible, update]);

	return (
		<>
			<div ref={setReferenceElement}>{children[0]}</div>

			{isVisible && (
				<Portal>
					<div
						className="Popover"
						ref={setPopperElement}
						style={styles.popper}
						{...attributes.popper}
					>
						{children[1]}
						<div ref={setArrowElement} style={styles.arrow} />
					</div>
				</Portal>
			)}
		</>
	);
}

export default Popover;
