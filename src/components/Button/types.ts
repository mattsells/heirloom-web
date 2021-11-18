import { ReactNode } from 'react';

export type ButtonProps = {
	children?: ReactNode;
	disabled?: boolean;
	id?: string;
	onClick?: VoidFunction;
	type?: 'button' | 'submit';
};
