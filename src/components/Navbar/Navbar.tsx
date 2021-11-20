import { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsGearWideConnected } from 'react-icons/bs';
import { createUseStyles } from 'react-jss';

import * as Panel from '@/components/Panel';
import Popover from '@/components/Popover';
import * as Text from '@/components/Text';
import useSession from '@/hooks/useSession';

import Block from './Block';
import { NAVBAR_ITEMS } from './config';
import Link from './Link';

function Navbar(): ReactElement {
	const { t } = useTranslation();
	const { signOut } = useSession();

	const [isSettingsVisible, setIsSettingsVisible] = useState(false);

	const handleClickSettings = (): void => {
		setIsSettingsVisible((prev) => !prev);
	};

	return (
		<div className="bg-green-200 shadow-lg flex flex-col h-full">
			<div className="flex-grow">
				<ul>
					{NAVBAR_ITEMS.map(({ icon: Icon, ...props }, index) => (
						<Link {...props} icon={<Icon />} key={index} />
					))}
				</ul>
			</div>

			<div>
				<ul>
					<Popover
						isVisible={isSettingsVisible}
						offsetX={5}
						offsetY={-5}
						onDismiss={handleClickSettings}
						placement="right"
					>
						<Block
							icon={<BsGearWideConnected />}
							label={t('settings.title')}
							onClick={handleClickSettings}
						/>

						<Panel.Frame isFloating>
							<div className="px-6 py-3">
								<Text.Link onClick={signOut}>
									{t('settings.sign-out')}
								</Text.Link>
							</div>
						</Panel.Frame>
					</Popover>
				</ul>
			</div>
		</div>
	);
}

export default Navbar;
