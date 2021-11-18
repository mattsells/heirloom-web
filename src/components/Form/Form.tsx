import { HTMLProps, ReactElement } from 'react';

type Props = HTMLProps<HTMLFormElement>;

function Form(props: Props): ReactElement<Props> {
	return <form className="mb-2" {...props} />;
}

export default Form;
