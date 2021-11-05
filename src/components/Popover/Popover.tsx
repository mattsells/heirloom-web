import { useEffect, useRef } from 'react';
import { ReactElement, ReactNode, useState } from 'react';
import { usePopper } from 'react-popper';

import Portal from '@/components/Portal';

type Props = {
	children: ReactNode[];
	isVisible: boolean;
	offsetX?: number;
	offsetY?: number;
	onDismiss?: VoidFunction;
	// TODO: Get correct typing for this
	placement?: string;
};

function Popover({
	children,
	isVisible,
	offsetX,
	offsetY,
	onDismiss,
	placement = 'bottom',
}: Props): ReactElement<Props> {
	const listenerRef = useRef(null);
	const [referenceElement, setReferenceElement] =
		useState<HTMLDivElement>(null);
	const [popperElement, setPopperElement] = useState<HTMLDivElement>(null);
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

	useEffect(() => {
		if (onDismiss && isVisible && !listenerRef.current) {
			const listener = (e: any) => {
				if (
					!popperElement.contains(e.target) &&
					!referenceElement.contains(e.target)
				) {
					onDismiss();
				}
			};

			listenerRef.current = listener;
			window.document.addEventListener('click', listener);
		}

		return () => {
			if (listenerRef.current) {
				window.document.removeEventListener('click', listenerRef.current);
				listenerRef.current = null;
			}
		};
	}, [isVisible, onDismiss, popperElement, referenceElement]);

	useEffect(() => {
		return () => {
			if (listenerRef.current) {
				window.document.removeEventListener('click', listenerRef.current);
			}
		};
	}, []);

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
