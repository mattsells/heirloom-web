import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import Spinner from './Spinner';

type Props = {
	text?: string;
};

function Placeholder({ text }: Props): ReactElement<Props> {
	const { t } = useTranslation();

	const displayText = text || t('global.loading');

	return (
		<div className="flex flex-col flex-grow items-center justify-center">
			<div className="mb-4">
				<Spinner />
			</div>

			<span className="text-lg text-red-300">{displayText}</span>
		</div>
	);
}

export default Placeholder;
