import { Formik } from 'formik';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import apiRoutes from '@/api/routes';
import { createSessionBody } from '@/api/utils/authentication';
import { Submit } from '@/components/Button';
import * as InputGroup from '@/components/InputGroup';
import * as Layout from '@/components/Layout';
import * as Panel from '@/components/Panel';
import { Header } from '@/components/Text';
import ApiContext from '@/context/api';
import useRedirect from '@/hooks/useRedirect';
import useSession from '@/hooks/useSession';
import webRoutes from '@/router/routes';
import { User } from '@/types/user';

const formValues = {
	email: '',
	password: '',
};

const LoginSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string().required(),
});

function Login() {
	const client = useContext(ApiContext);
	const { redirectTo } = useRedirect();
	const { setSession } = useSession();
	const { t } = useTranslation();

	return (
		<Layout.Minimal>
			<Layout.Centered>
				<Panel.Frame isFloating size="regular">
					<Panel.Content>
						<Header>{t('app.name')}</Header>
						<Formik
							initialValues={formValues}
							validationSchema={LoginSchema}
							onSubmit={async ({ email, password }) => {
								try {
									const { data: user, headers } = await client.create<User>(
										apiRoutes.users.signIn,
										createSessionBody(email, password)
									);

									toast.success(t('authentication.loginSuccess'));
									setSession(user, headers.Authorization);
									redirectTo(webRoutes.profile);
								} catch (err) {
									toast.error(t('authentication.loginFailure'));
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
								<form onSubmit={handleSubmit}>
									<InputGroup.Text
										error={errors.email}
										label={t('fields.email')}
										name="email"
										onBlur={handleBlur}
										onChange={handleChange}
										touched={touched.email}
										value={values.email}
									/>

									<InputGroup.Password
										error={errors.password}
										label={t('fields.password')}
										name="password"
										onBlur={handleBlur}
										onChange={handleChange}
										touched={touched.password}
										value={values.password}
									/>

									<Submit disabled={isSubmitting}>Submit</Submit>
								</form>
							)}
						</Formik>
					</Panel.Content>
				</Panel.Frame>
			</Layout.Centered>
		</Layout.Minimal>
	);
}

export default Login;
