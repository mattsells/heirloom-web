import { ReactElement } from 'react';

import Primary from './Primary';
import { ButtonProps } from './types';

function Submit(props: ButtonProps): ReactElement<ButtonProps> {
	return <Primary {...props} type="submit" />;
}

export default Submit;
