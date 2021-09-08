import { Formik } from 'formik';
import { ReactElement, useContext } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';

import apiRoutes from '@/api/routes';
import { createRecipeBody } from '@/api/utils/recipes';
import { Submit } from '@/components/Button';
import Form from '@/components/Form';
import * as InputGroup from '@/components/InputGroup';
import * as ListGroup from '@/components/ListGroup';
import ApiContext from '@/context/api';
import useActiveAccount from '@/hooks/useActiveAccount';
import useRedirect from '@/hooks/useRedirect';
import webRoutes from '@/router/routes';
import { Recipe } from '@/types/recipe';

type Props = {
	recipe?: Recipe;
	onSuccess?: (recipe: Recipe) => void;
};

type FormValues = {
	name: string;
	ingredients: string[];
	directions: string[];
};

const formValues: FormValues = {
	name: '',
	ingredients: [],
	directions: [],
};

const RecipeSchema = Yup.object().shape({
	name: Yup.string().required(),
});

function RecipeForm({ recipe }: Props): ReactElement<Props> {
	const { account } = useActiveAccount();
	const client = useContext(ApiContext);
	const queryClient = useQueryClient();
	const { redirectTo } = useRedirect();
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

					// TODO: Create utility to generate route with id
					redirectTo(`/recipes/${recipe.id}`);
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
			}) => (
				<Form onSubmit={handleSubmit}>
					<InputGroup.Text
						error={errors.name}
						label={t('fields.recipe-name')}
						name="name"
						onBlur={handleBlur}
						onChange={handleChange}
						touched={touched.name}
						value={values.name}
					/>

					<ListGroup.Numbered
						error={errors.ingredients as string}
						label={t('fields.recipe-ingredients')}
						name="ingredients"
						onBlur={handleBlur}
						onChange={handleChange}
						touched={touched.ingredients}
						value={values.ingredients}
					/>

					<Submit disabled={isSubmitting}>{t('recipes.add')}</Submit>
				</Form>
			)}
		</Formik>
	);
}

export default RecipeForm;
