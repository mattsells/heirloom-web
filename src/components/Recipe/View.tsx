import { ReactElement, useState } from 'react';
import { BiPlusMedical } from 'react-icons/bi';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';
import { SRLWrapper } from 'simple-react-lightbox';

import * as Button from '@/components/Button';
import Breadcrumbs, { BreadcrumbsPath } from '@/components/Breadcrumbs';
import * as Loading from '@/components/Loading';
import * as Modal from '@/components/Modal';
import * as Panel from '@/components/Panel';
import * as Text from '@/components/Text';
import * as Story from '@/components/Story';
import { LIGHTBOX_OPTIONS } from '@/config/lightbox';
import routes from '@/router/routes';
import { Recipe } from '@/types/recipe';
import { Forest, Size, Space } from '@/variables';

import Cover from './Cover';

type Props = {
	isLoading: boolean;
	recipe: Recipe;
};

const useStyles = createUseStyles(
	{
		root: {
			height: '100%',
		},

		artifacts: {
			display: 'grid',
			gap: Space.wide,
			gridTemplateColumns: 'repeat(8, 1fr)',
			margin: `${Space.wide} 0`,
		},

		addArtifact: {
			alignItems: 'center',
			color: Forest.light,
			display: 'flex',
			flexDirection: 'column',
			height: '100%',
			justifyContent: 'center',

			'& > svg': {
				fontSize: Size.large,
				marginBottom: Space.thin,
			},
		},

		addArtifactText: {
			fontSize: Size.small,
		},

		list: {
			fontSize: Size.regular,
			paddingLeft: Space.wide,

			'& li': {
				'&:not(:last-child)': {
					marginBottom: Space.thin,
				},
			},
		},

		section: {
			marginBottom: Space.wide,
		},
	},
	{ name: 'RecipeView' }
);

function View({ isLoading, recipe }: Props): ReactElement<Props> {
	const classes = useStyles();
	const { t } = useTranslation();

	const [isArtifactModalOpen, setIsArtifactModalOpen] = useState(false);

	if (isLoading) {
		return <Loading.Placeholder text={t('recipe.loading')} />;
	}

	// TODO: Maybe update this component to be more automated?
	const path: BreadcrumbsPath = [
		{
			label: 'Recipes',
			path: routes.recipes,
		},
		{
			label: recipe.name,
		},
	];

	return (
		<div className={classes.root}>
			<Breadcrumbs path={path} />

			<Cover recipe={recipe} />

			<div className={classes.artifacts}>
				<SRLWrapper options={LIGHTBOX_OPTIONS}>
					{recipe.stories.map((story) => (
						<Story.Card
							key={story.id}
							onClick={(story) => console.log(story)}
							story={story}
						/>
					))}
				</SRLWrapper>

				<Button.Square onClick={() => setIsArtifactModalOpen(true)}>
					<div className={classes.addArtifact}>
						<BiPlusMedical />
						<span className={classes.addArtifactText}>
							{t('recipe.add-artifact')}
						</span>
					</div>
				</Button.Square>
			</div>

			<div className={classes.section}>
				<Panel.Frame>
					<Panel.Content>
						<Text.Header as="h2">{t('recipe.ingredients')}</Text.Header>

						<ul className={classes.list}>
							{recipe.ingredients.map((ingredient: string, index: number) => (
								<li key={index}>{ingredient}</li>
							))}
						</ul>
					</Panel.Content>
				</Panel.Frame>
			</div>

			<div className={classes.section}>
				<Panel.Frame>
					<Panel.Content>
						<Text.Header as="h2">{t('recipe.directions')}</Text.Header>

						<ol className={classes.list}>
							{recipe.directions.map((ingredient: string, index: number) => (
								<li key={index}>{ingredient}</li>
							))}
						</ol>
					</Panel.Content>
				</Panel.Frame>
			</div>

			<Modal.Modal
				onDismiss={() => setIsArtifactModalOpen(false)}
				isVisible={isArtifactModalOpen}
			>
				<Modal.Content>
					<Story.Form
						onSuccess={() => setIsArtifactModalOpen(false)}
						recipe={recipe}
						storyType="artifact"
					/>
				</Modal.Content>
			</Modal.Modal>
		</div>
	);
}

export default View;
