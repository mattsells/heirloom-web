import { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsGearWideConnected } from 'react-icons/bs';
import { createUseStyles } from 'react-jss';

import * as Panel from '@/components/Panel';
import Popover from '@/components/Popover';
import * as Text from '@/components/Text';
import useSession from '@/hooks/useSession';
import { Mint } from '@/variables/colors';
import { Shadow } from '@/variables/shadows';

import Block from './Block';
import { NAVBAR_ITEMS } from './config';
import Link from './Link';

const useStyles = createUseStyles(
	{
		root: {
			backgroundColor: Mint.regular,
			boxShadow: Shadow.right,
			display: 'flex',
			flexDirection: 'column',
			height: '100%',
		},

		features: {
			flex: 1,
		},
	},
	{ name: 'Navbar' }
);

function Navbar(): ReactElement {
	const classes = useStyles();
	const { t } = useTranslation();
	const { signOut } = useSession();

	const [isSettingsVisible, setIsSettingsVisible] = useState(false);

	const handleClickSettings = (): void => {
		setIsSettingsVisible((prev) => !prev);
	};

	return (
		<div className={classes.root}>
			<div className={classes.features}>
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
						onDismiss={() => setIsSettingsVisible(false)}
						placement="right"
					>
						<Block
							icon={<BsGearWideConnected />}
							label={t('settings.title')}
							onClick={handleClickSettings}
						/>

						<Panel.Frame isFloating>
							<Panel.Content>
								<Text.Link onClick={signOut}>
									{t('settings.sign-out')}
								</Text.Link>
							</Panel.Content>
						</Panel.Frame>
					</Popover>
				</ul>
			</div>
		</div>
	);
}

export default Navbar;
