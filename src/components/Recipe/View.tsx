import { ReactElement, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiPlusMedical } from 'react-icons/bi';
import { SRLWrapper } from 'simple-react-lightbox';

import Breadcrumbs, { trail } from '@/components/Breadcrumbs';
import * as Button from '@/components/Button';
import * as Loading from '@/components/Loading';
import * as Modal from '@/components/Modal';
import * as Panel from '@/components/Panel';
import * as Story from '@/components/Story';
import * as Text from '@/components/Text';
import { LIGHTBOX_OPTIONS } from '@/config/lightbox';
import routes from '@/router/routes';
import { Recipe } from '@/types/recipe';

import Cover from './Cover';
import Form from './Form';

type Props = {
	isLoading: boolean;
	recipe: Recipe;
};

function View({ isLoading, recipe }: Props): ReactElement<Props> {
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

	const breadcrumbs = trail()
		.drop(t('recipes.label'), routes.get('recipes'))
		.drop(recipe.name);

	return (
		<div className="h-full">
			<Breadcrumbs path={breadcrumbs} />

			<Cover onClickEdit={() => setIsEditModalOpen(true)} recipe={recipe} />

			{!!artifacts.length && (
				<Text.Header as="h2">{t('story.artifacts')}</Text.Header>
			)}

			<SRLWrapper options={LIGHTBOX_OPTIONS}>
				<div className="grid grid-cols-8 gap-4 my-2">
					{artifacts.map((story) => (
						<Story.Card key={story.id} story={story} />
					))}

					<Button.Square onClick={() => setIsArtifactModalOpen(true)}>
						<div className="flex flex-col items-center justify-center h-full text-green-400 p-2">
							<div className="text-lg mb-1">
								<BiPlusMedical />
							</div>
							<span className="text-sm">{t('recipe.add-artifact')}</span>
						</div>
					</Button.Square>
				</div>
			</SRLWrapper>

			<div className="mb-4">
				<Panel.Frame>
					<Panel.Content>
						<Text.Header as="h2">{t('recipe.ingredients')}</Text.Header>

						<ul className="text-base list-disc list-inside">
							{recipe.ingredients.map((ingredient: string, index: number) => (
								<li key={index}>{ingredient}</li>
							))}
						</ul>
					</Panel.Content>
				</Panel.Frame>
			</div>

			<div className="flex my-2">
				<div className="flex-grow mb-4">
					<Panel.Frame>
						<Panel.Content>
							<Text.Header as="h2">{t('recipe.directions')}</Text.Header>

							<ol className="text-base list-decimal list-inside">
								{recipe.directions.map((ingredient: string, index: number) => (
									<li key={index}>{ingredient}</li>
								))}
							</ol>
						</Panel.Content>
					</Panel.Frame>
				</div>

				<div className="flex flex-col" style={{ minWidth: '120px' }}>
					<SRLWrapper options={LIGHTBOX_OPTIONS}>
						{directions.map((story) => (
							<div className="mb-2" key={story.id}>
								<Story.Card story={story} />
							</div>
						))}
					</SRLWrapper>

					<Button.Square onClick={() => setIsDirectionModalOpen(true)}>
						<div className="flex flex-col items-center justify-center h-full text-green-400 p-2">
							<div className="text-lg mb-1">
								<BiPlusMedical />
							</div>
							<span className="text-sm">{t('recipe.add-direction')}</span>
						</div>
					</Button.Square>
				</div>
			</div>

			{!!memories.length && (
				<Text.Header as="h2">{t('story.memories')}</Text.Header>
			)}

			<SRLWrapper options={LIGHTBOX_OPTIONS}>
				<div className="grid grid-cols-8 gap-4 my-2">
					{memories.map((story) => (
						<Story.Card key={story.id} story={story} />
					))}

					<Button.Square onClick={() => setIsMemoryModalOpen(true)}>
						<div className="flex flex-col items-center justify-center h-full text-green-400 p-2">
							<div className="text-lg mb-1">
								<BiPlusMedical />
							</div>
							<span className="text-sm">{t('recipe.add-memory')}</span>
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
