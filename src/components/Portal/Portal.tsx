// imports
import { ReactElement, ReactNode,useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';

type Props = {
	children: ReactNode;
	parent?: HTMLElement;
};

function Portal({ children, parent }: Props): ReactElement {
	const el = useMemo(() => document.createElement('div'), []);

	useEffect(() => {
		const target = parent && parent.appendChild ? parent : document.body;

		target.appendChild(el);

		return () => {
			target.removeChild(el);
		};
	}, [el, parent]);

	return ReactDOM.createPortal(children, el);
}

export default Portal;
