import { ReactElement, ReactNode } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { createUseStyles } from 'react-jss';

import * as Panel from '@/components/Panel';
import Portal from '@/components/Portal';
import { Size } from '@/variables/fonts';
import { Space } from '@/variables/space';

type Props = {
	children: ReactNode;
	isVisible: boolean;
	onDismiss: VoidFunction;
};

const useStyles = createUseStyles({
	root: {
		maxHeight: '100%',
		maxWidth: '800px',
		width: '100%',
	},

	backdrop: {
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		bottom: 0,
		display: 'flex',
		justifyContent: 'center',
		left: 0,
		padding: Space.extraWide,
		position: 'fixed',
		right: 0,
		top: 0,
	},

	header: {
		display: 'flex',
		justifyContent: 'flex-end',
		padding: Space.regular,
	},

	button: {
		background: 'none',
		border: 'none',
		cursor: 'pointer',
		fontSize: Size.giant,
		padding: Space.narrow,
	},

	content: {
		overflowY: 'auto',
	},
});

function Modal({ children, isVisible, onDismiss }: Props): ReactElement<Props> {
	const classes = useStyles();

	if (!isVisible) {
		return null;
	}

	return (
		<Portal>
			<div className={classes.backdrop}>
				<div className={classes.root}>
					<Panel.Frame isFloating>
						<div className={classes.header}>
							<button className={classes.button} onClick={onDismiss}>
								<GrFormClose />
							</button>
						</div>

						<div className={classes.content}>{children}</div>
					</Panel.Frame>
				</div>
			</div>
		</Portal>
	);
}

export default Modal;
