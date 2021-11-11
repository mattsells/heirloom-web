import { Formik } from 'formik';
import { ReactElement } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';

import apiRoutes from '@/api/routes';
import { createStoryBody, CreateStoryBodyParams } from '@/api/utils/stories';
import { Submit } from '@/components/Button';
import Form from '@/components/Form';
import * as Input from '@/components/Input';
import * as InputGroup from '@/components/InputGroup';
import { useHttpClient } from '@/context/api';
import { Recipe } from '@/types/recipe';
import { Story, StoryType } from '@/types/story';

type Props = {
	recipe: Recipe;
	storyType: StoryType;
	onSuccess?: (story: Story) => void;
};

type FormValues = Omit<
	CreateStoryBodyParams,
	'accountId' | 'recipeIds' | 'storyType'
>;

const formValues: FormValues = {
	contentType: 'image', // TODO: Add in video support
	description: '',
	image: '',
	name: '',
};

const StorySchema = Yup.object().shape({
	name: Yup.string()
		.required()
		.max(256, 'Name is too long (max 256 characters)'),
	description: Yup.string()
		.required()
		.max(10000, 'Description is too long (max 10000 characters)'),
});

const useStyles = createUseStyles({
	image: {
		margin: 'auto',
		maxWidth: '350px',
	},
});

function RecipeForm({
	onSuccess,
	recipe,
	storyType,
}: Props): ReactElement<Props> {
	const http = useHttpClient();
	const queryClient = useQueryClient();
	const { t } = useTranslation();

	const styles = useStyles();

	return (
		<Formik
			initialValues={formValues}
			validationSchema={StorySchema}
			onSubmit={async (fields) => {
				try {
					const { data: story } = await http.create<Story>(
						apiRoutes.stories.index,
						createStoryBody({
							...fields,
							accountId: recipe.accountId,
							recipeIds: [recipe.id],
							storyType,
						})
					);

					toast.success(t('story.created-artifact'));
					queryClient.invalidateQueries(['recipe', recipe.id]);

					onSuccess(story);
				} catch (err) {
					// TODO: Add error handling
				}
			}}
		>
			{({
				values,
				errors,
				touched,
				dirty,
				handleChange,
				handleBlur,
				handleSubmit,
				isSubmitting,
				isValid,
			}) => {
				return (
					<Form onSubmit={handleSubmit}>
						<div className={styles.image}>
							<Input.Image
								frame="square"
								name="image"
								onChange={handleChange}
								text={t('story.add-artifact')}
								value={values.image}
							/>
						</div>

						<InputGroup.Text
							error={errors.name}
							label={t('story.name')}
							name="name"
							onBlur={handleBlur}
							onChange={handleChange}
							touched={touched.name}
							value={values.name}
						/>

						<InputGroup.Textarea
							error={errors.description}
							label={t('story.description')}
							name="description"
							onBlur={handleBlur}
							onChange={handleChange}
							touched={touched.description}
							value={values.description}
						/>

						<Submit disabled={isSubmitting || !isValid || !dirty}>
							{t('story.add')}
						</Submit>
					</Form>
				);
			}}
		</Formik>
	);
}

export default RecipeForm;
