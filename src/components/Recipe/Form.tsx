import { Formik, FieldArray } from 'formik';
import { ReactElement, useContext } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';

import apiRoutes from '@/api/routes';
import { createRecipeBody, CreateRecipeBodyParams } from '@/api/utils/recipes';
import { Submit } from '@/components/Button';
import Form from '@/components/Form';
import * as Input from '@/components/Input';
import * as InputGroup from '@/components/InputGroup';
import * as ListGroup from '@/components/ListGroup';
import ApiContext from '@/context/api';
import useActiveAccount from '@/hooks/useActiveAccount';
import webroutes from '@/router/routes';
import { Recipe } from '@/types/recipe';
import { route } from '@/utils/routing';

type Props = {
	recipe?: Recipe;
	onSuccess?: (recipe: Recipe) => void;
};

type FormValues = Omit<CreateRecipeBodyParams, 'accountId'>;

const formValues: FormValues = {
	coverImage: '',
	directions: [],
	ingredients: [],
	name: '',
};

const RecipeSchema = Yup.object().shape({
	name: Yup.string().required(),
});

function RecipeForm({ recipe }: Props): ReactElement<Props> {
	const { account } = useActiveAccount();
	const client = useContext(ApiContext);
	const history = useHistory();
	const queryClient = useQueryClient();
	const { t } = useTranslation();

	return (
		<Formik
			initialValues={formValues}
			validationSchema={RecipeSchema}
			onSubmit={async (fields) => {
				try {
					const { data: recipe } = await client.create<Recipe>(
						apiRoutes.recipes.index,
						createRecipeBody({ ...fields, accountId: account.id })
					);

					toast.success(t('recipes.created'));
					queryClient.invalidateQueries('recipes');

					history.push(route(webroutes.recipe, { id: recipe.id }));
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
								<ListGroup.Numbered
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
								<ListGroup.Bulleted
									error={errors.directions as string}
									label={t('recipe.directions')}
									name="directions"
									onBlur={handleBlur}
									onChange={handleChange}
									touched={touched.directions}
									values={values.directions}
								/>
							)}
						/>

						<Submit disabled={isSubmitting}>{t('recipes.add')}</Submit>
					</Form>
				);
			}}
		</Formik>
	);
}

export default RecipeForm;
