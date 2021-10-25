import { ReactElement, useMemo, useState } from 'react';
import { BiPlusMedical } from 'react-icons/bi';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';
import { SRLWrapper } from 'simple-react-lightbox';

import * as Button from '@/components/Button';
import Breadcrumbs, { trail } from '@/components/Breadcrumbs';
import * as Loading from '@/components/Loading';
import * as Modal from '@/components/Modal';
import * as Panel from '@/components/Panel';
import * as Text from '@/components/Text';
import * as Story from '@/components/Story';
import { LIGHTBOX_OPTIONS } from '@/config/lightbox';
import routes from '@/router/routes';
import { Recipe } from '@/types/recipe';
import { combine } from '@/utils/string';
import { Forest, Size, Space } from '@/variables';

import Cover from './Cover';
import Form from './Form';

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

		addStoryText: {
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

		directionsWrapper: {
			display: 'flex',
			margin: `0 -${Space.regular}`,

			'& > *': {
				margin: `0 ${Space.regular}`,
			},
		},

		directions: {
			display: 'flex',
			flexDirection: 'column',
			minWidth: '120px',
		},

		directionCard: {
			marginBottom: Space.regular,
		},

		grow: {
			flexGrow: 1,
		},
	},
	{ name: 'RecipeView' }
);

function View({ isLoading, recipe }: Props): ReactElement<Props> {
	const classes = useStyles();
	const { t } = useTranslation();

	const [isArtifactModalOpen, setIsArtifactModalOpen] = useState(false);
	const [isDirectionModalOpen, setIsDirectionModalOpen] = useState(false);
	const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	const artifacts = useMemo(() => {
		return recipe?.stories.filter((story) => story.storyType === 'artifact');
	}, [recipe]);

	const directions = useMemo(() => {
		return recipe?.stories.filter((story) => story.storyType === 'direction');
	}, [recipe]);

	const memories = useMemo(() => {
		return recipe?.stories.filter((story) => story.storyType === 'memory');
	}, [recipe]);

	if (isLoading) {
		return <Loading.Placeholder text={t('recipe.loading')} />;
	}

	console.log('recupe', recipe);

	const breadcrumbs = trail()
		.drop(t('recipes.label'), routes.recipes)
		.drop(recipe.name);

	return (
		<div className={classes.root}>
			<Breadcrumbs path={breadcrumbs} />

			<Cover onClickEdit={() => setIsEditModalOpen(true)} recipe={recipe} />

			{!!artifacts.length && (
				<Text.Header as="h2">{t('story.artifacts')}</Text.Header>
			)}

			<SRLWrapper options={LIGHTBOX_OPTIONS}>
				<div className={classes.artifacts}>
					{artifacts.map((story) => (
						<Story.Card key={story.id} story={story} />
					))}

					<Button.Square onClick={() => setIsArtifactModalOpen(true)}>
						<div className={classes.addArtifact}>
							<BiPlusMedical />
							<span className={classes.addStoryText}>
								{t('recipe.add-artifact')}
							</span>
						</div>
					</Button.Square>
				</div>
			</SRLWrapper>

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

			<div className={classes.directionsWrapper}>
				<div className={combine(classes.section, classes.grow)}>
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

				<div className={classes.directions}>
					<SRLWrapper options={LIGHTBOX_OPTIONS}>
						{directions.map((story) => (
							<div className={classes.directionCard} key={story.id}>
								<Story.Card story={story} />
							</div>
						))}
					</SRLWrapper>

					<Button.Square onClick={() => setIsDirectionModalOpen(true)}>
						<div className={classes.addArtifact}>
							<BiPlusMedical />
							<span className={classes.addStoryText}>
								{t('recipe.add-direction')}
							</span>
						</div>
					</Button.Square>
				</div>
			</div>

			{!!memories.length && (
				<Text.Header as="h2">{t('story.memories')}</Text.Header>
			)}

			<SRLWrapper options={LIGHTBOX_OPTIONS}>
				<div className={classes.artifacts}>
					{memories.map((story) => (
						<Story.Card key={story.id} story={story} />
					))}

					<Button.Square onClick={() => setIsMemoryModalOpen(true)}>
						<div className={classes.addArtifact}>
							<BiPlusMedical />
							<span className={classes.addStoryText}>
								{t('recipe.add-memory')}
							</span>
						</div>
					</Button.Square>
				</div>
			</SRLWrapper>

			<Modal.Modal
				isVisible={isArtifactModalOpen}
				onDismiss={() => setIsArtifactModalOpen(false)}
			>
				<Modal.Content>
					<Story.Form
						onSuccess={() => setIsArtifactModalOpen(false)}
						recipe={recipe}
						storyType="artifact"
					/>
				</Modal.Content>
			</Modal.Modal>

			<Modal.Modal
				isVisible={isDirectionModalOpen}
				onDismiss={() => setIsDirectionModalOpen(false)}
			>
				<Modal.Content>
					<Story.Form
						onSuccess={() => setIsDirectionModalOpen(false)}
						recipe={recipe}
						storyType="direction"
					/>
				</Modal.Content>
			</Modal.Modal>

			<Modal.Modal
				isVisible={isMemoryModalOpen}
				onDismiss={() => setIsMemoryModalOpen(false)}
			>
				<Modal.Content>
					<Story.Form
						onSuccess={() => setIsMemoryModalOpen(false)}
						recipe={recipe}
						storyType="memory"
					/>
				</Modal.Content>
			</Modal.Modal>

			<Modal.Modal
				isVisible={isEditModalOpen}
				onDismiss={() => setIsEditModalOpen(false)}
			>
				<Modal.Content>
					<Text.Header as="h2">{t('recipes.edit')}</Text.Header>
					<Form onSuccess={() => setIsEditModalOpen(false)} recipe={recipe} />
				</Modal.Content>
			</Modal.Modal>
		</div>
	);
}

export default View;
