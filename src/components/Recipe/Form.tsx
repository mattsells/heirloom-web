import { Formik, FieldArray } from 'formik';
import { ReactElement } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useMutation, useQueryClient } from 'react-query';
import * as Yup from 'yup';

import apiRoutes from '@/api/routes';
import { recipeBody, RecipeBodyParams } from '@/api/utils/recipes';
import * as Button from '@/components/Button';
import Form from '@/components/Form';
import * as Input from '@/components/Input';
import * as InputGroup from '@/components/InputGroup';
import * as Level from '@/components/Level';
import ListGroup from '@/components/ListGroup';
import { useHttpClient } from '@/context/api';
import useActiveAccount from '@/hooks/useActiveAccount';
import webroutes from '@/router/routes';
import { Recipe } from '@/types/recipe';
import { route } from '@/utils/routing';

type Props = {
	recipe?: Recipe;
	onSuccess?: (recipe: Recipe) => void;
};

type FormValues = Omit<RecipeBodyParams, 'accountId'>;

const formValues: FormValues = {
	coverImage: '',
	directions: [],
	ingredients: [],
	name: '',
};

const RecipeSchema = Yup.object().shape({
	name: Yup.string().required(),
});

function imageData(recipe: Recipe) {
	if (!recipe.coverImageUrl || !recipe.coverImageData) {
		return '';
	}

	return JSON.stringify({
		data: recipe.coverImageData,
		url: recipe.coverImageUrl,
	});
}

function RecipeForm({ onSuccess, recipe }: Props): ReactElement<Props> {
	const { account } = useActiveAccount();
	const http = useHttpClient();
	const history = useHistory();
	const queryClient = useQueryClient();
	const { t } = useTranslation();

	const initialValues = {
		...formValues,
		...(recipe && {
			directions: recipe.directions,
			ingredients: recipe.ingredients,
			name: recipe.name,
			coverImage: imageData(recipe),
		}),
	};

	const recipePath = recipe
		? route(apiRoutes.recipes.show, { id: recipe.id })
		: '';

	const destroyRecipe = useMutation(() => http.destroy(recipePath), {
		onSuccess: () => {
			toast.success(t('recipe.destroyed'));
			// FIXME: This isn't working
			queryClient.invalidateQueries('recipes');
			history.push(webroutes.recipes);
		},
	});

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={RecipeSchema}
			onSubmit={async (fields) => {
				try {
					if (recipe) {
						const { data } = await http.update<Recipe>(
							recipePath,
							recipeBody({ ...fields, accountId: account.id })
						);

						toast.success(t('recipe.updated'));

						// TODO: Update data directly rather than re-pull
						queryClient.invalidateQueries('recipes');
						queryClient.invalidateQueries(['recipe', recipe.id]);

						if (onSuccess) {
							onSuccess(data);
						}
					} else {
						const { data: recipe } = await http.create<Recipe>(
							apiRoutes.recipes.index,
							recipeBody({ ...fields, accountId: account.id })
						);

						toast.success(t('recipes.created'));
						queryClient.invalidateQueries('recipes');

						history.push(route(webroutes.recipe, { id: recipe.id }));
					}
				} catch (err) {
					// TODO: Add error handling
				}
			}}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
				isSubmitting,
			}) => {
				return (
					<Form onSubmit={handleSubmit}>
						<Input.Image
							name="coverImage"
							onChange={handleChange}
							text={t('recipe.add-cover-image')}
							value={values.coverImage}
						/>

						<InputGroup.Text
							error={errors.name}
							label={t('recipe.name')}
							name="name"
							onBlur={handleBlur}
							onChange={handleChange}
							touched={touched.name}
							value={values.name}
						/>

						<FieldArray
							name="ingredients"
							render={() => (
								<ListGroup
									error={errors.ingredients as string}
									label={t('recipe.ingredients')}
									name="ingredients"
									onBlur={handleBlur}
									onChange={handleChange}
									touched={touched.ingredients}
									values={values.ingredients}
								/>
							)}
						/>

						<FieldArray
							name="directions"
							render={() => (
								<ListGroup
									error={errors.directions as string}
									inputType="textarea"
									label={t('recipe.directions')}
									listType="number"
									name="directions"
									onBlur={handleBlur}
									onChange={handleChange}
									touched={touched.directions}
									values={values.directions}
								/>
							)}
						/>

						<Level.Base arrangement="split">
							<Level.Item>
								<Button.Submit disabled={isSubmitting}>
									{t(recipe ? 'recipes.save' : 'recipes.add')}
								</Button.Submit>
							</Level.Item>

							{recipe && (
								<Level.Item>
									<Button.Themed
										theme="destructive"
										onClick={() => destroyRecipe.mutate()}
									>
										{t('recipe.destroy')}
									</Button.Themed>
								</Level.Item>
							)}
						</Level.Base>
					</Form>
				);
			}}
		</Formik>
	);
}

export default RecipeForm;
