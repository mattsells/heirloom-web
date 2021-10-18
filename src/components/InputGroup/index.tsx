import InputGroup, { Props as InputGroupProps } from './InputGroup';
import TextareaGroup, { Props as TextareaGroupProps } from './TextareaGroup';

export const Password = (props: InputGroupProps) => (
	<InputGroup type="password" {...props} />
);

export const Text = (props: InputGroupProps) => (
	<InputGroup type="text" {...props} />
);

export const Textarea = (props: TextareaGroupProps) => (
	<TextareaGroup type="text" {...props} />
);
