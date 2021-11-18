import { ReactElement, ReactNode } from 'react';
import { Link as BrowserLink } from 'react-router-dom';

type Props = {
	children?: ReactNode;
	onClick?: VoidFunction;
	to?: string;
};

function Link(props: Props): ReactElement<Props> {
	const classes =
		'text-green-400 hover:text-green-200 text-base transition-colors duration-100';

	if (props.onClick) {
		return (
			<a className={classes} {...props}>
				{props.children}
			</a>
		);
	}

	return <BrowserLink className={classes} {...props} to={props.to} />;
}

export default Link;
