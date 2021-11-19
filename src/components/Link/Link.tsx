import { ReactElement, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

type Props = {
	children?: ReactNode;
	onClick?: VoidFunction;
	to: string;
};

const styles =
	'text-blue-400 hover:text-blue-500 no-underline transition-colors duration-75';

function Body({ children, onClick, to }: Props): ReactElement<Props> {
	if (onClick) {
		return (
			<a className={styles} href={to} onClick={onClick}>
				{children}
			</a>
		);
	}

	return (
		<RouterLink className={styles} to={to}>
			{children}
		</RouterLink>
	);
}

export default Body;
