import { ReactElement } from 'react';
import { TailSpin } from 'react-loading-icons';

import { Tangerine } from '@/variables/colors';

function Spinner(): ReactElement {
	return <TailSpin stroke={Tangerine.light} />;
}

export default Spinner;
