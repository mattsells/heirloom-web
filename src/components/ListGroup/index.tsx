import ListGroup, { Props } from './ListGroup';

export const Bulleted = (props: Omit<Props, 'type'>) => (
	<ListGroup type="bullet" {...props} />
);

export const Numbered = (props: Omit<Props, 'type'>) => (
	<ListGroup type="number" {...props} />
);
