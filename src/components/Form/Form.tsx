import { HTMLProps, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Space } from '@/variables/space';

type Props = HTMLProps<HTMLFormElement>;

const useStyles = createUseStyles(
	{
		root: {
			marginBottom: Space.regular,
		},
	},
	{ name: 'Form' }
);

function Form(props: Props): ReactElement<Props> {
	const classes = useStyles();

	return <form className={classes.root} {...props} />;
}

export default Form;
