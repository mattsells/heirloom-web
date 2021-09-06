import { Formik } from 'formik';
import { ReactElement, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import apiRoutes from '@/api/routes';
import { createRecipeBody } from '@/api/utils/recipes';
import { Submit } from '@/components/Button';
import Form from '@/components/Form';
import * as Input from '@/components/Input';
import * as InputGroup from '@/components/InputGroup';
import ApiContext from '@/context/api';
import useActiveAccount from '@/hooks/useActiveAccount';
import useRedirect from '@/hooks/useRedirect';
import webRoutes from '@/router/routes';
import { Recipe } from '@/types/recipe';
import { Radius } from '@/variables/borders';
import { Shade } from '@/variables/colors';
import { Shadow } from '@/variables/shadows';

type Props = {
	recipe?: Recipe;
	onSuccess?: (recipe: Recipe) => void;
};

const useStyles = createUseStyles({
	root: {},
});

const formValues = {
	name: '',
};

const RecipeSchema = Yup.object().shape({
	name: Yup.string().required(),
});

function RecipeForm({ recipe }: Props): ReactElement<Props> {
	const { account } = useActiveAccount();
	const client = useContext(ApiContext);
	const { redirectTo } = useRedirect();
	const classes = useStyles();
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

					// TODO: Create utility to generate route with id
					redirectTo(`recipes/${recipe.id}`);
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

					<Submit disabled={isSubmitting}>{t('recipes.add')}</Submit>
				</Form>
			)}
		</Formik>
	);
}

export default RecipeForm;
