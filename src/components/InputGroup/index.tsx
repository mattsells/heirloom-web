import InputGroup, { Props } from './InputGroup';

export const Text = (props: Props) => <InputGroup type="text" {...props} />;
export const Password = (props: Props) => (
	<InputGroup type="password" {...props} />
);
