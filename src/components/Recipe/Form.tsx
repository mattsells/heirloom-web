import { Formik } from 'formik';
import { ReactElement, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import * as Input from '@/components/Input';
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

function Form({ recipe }: Props): ReactElement<Props> {
	const classes = useStyles();

	return (
		<div>
			<Input.File />
		</div>
	);
}

export default Form;
