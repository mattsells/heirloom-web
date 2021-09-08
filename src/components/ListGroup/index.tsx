import ListGroup, { Props } from './ListGroup';

export const Bulleted = (props: Omit<Props, 'type'>) => (
	<ListGroup type="bulleted" {...props} />
);

export const Numbered = (props: Omit<Props, 'type'>) => (
	<ListGroup type="numbered" {...props} />
);
