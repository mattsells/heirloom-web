import { Formik } from 'formik';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Redirect, useHistory } from 'react-router';
import * as Yup from 'yup';

import apiRoutes from '@/api/routes';
import { createSessionBody } from '@/api/utils/authentication';
import { Submit } from '@/components/Button';
import Form from '@/components/Form';
import * as InputGroup from '@/components/InputGroup';
import * as Layout from '@/components/Layout';
import Link from '@/components/Link';
import * as Panel from '@/components/Panel';
import * as Text from '@/components/Text';
import { useHttpClient } from '@/context/api';
import useSession from '@/hooks/useSession';
import HttpError from '@/lib/http/HttpError';
import webRoutes from '@/router/routes';
import { User } from '@/types/user';

const formValues = {
	email: '',
	password: '',
};

// TODO: Add translations
const LoginSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required'),
});

function Login() {
	const http = useHttpClient();
	const history = useHistory();
	const { isAuthenticated, setSession } = useSession();
	const { t } = useTranslation();

	if (isAuthenticated) {
		return <Redirect to={webRoutes.recipes} />;
	}

	return (
		<Layout.Minimal>
			<Layout.Centered>
				<Panel.Frame isFloating size="regular">
					<Panel.Content>
						<Text.Header>{t('login.title')}</Text.Header>
						<Formik
							initialValues={formValues}
							validationSchema={LoginSchema}
							onSubmit={async ({ email, password }) => {
								try {
									const { data: user, headers } = await http.create<User>(
										apiRoutes.users.signIn,
										createSessionBody(email, password)
									);

									toast.success(t('authentication.loginSuccess'));
									setSession(user, headers.Authorization);
									history.push(webRoutes.recipes);
								} catch (err) {
									if (err instanceof HttpError) {
										if (err.isUnauthorized) {
											toast.error(t('authentication.passwordIncorrect'));
										} else {
											toast.error(t('authentication.loginFailure'));
										}
									}
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

									<Submit disabled={isSubmitting}>{t('login.submit')}</Submit>
								</Form>
							)}
						</Formik>

						<Text.Body>
							{t('login.need-account-1')}{' '}
							<Link to={webRoutes.registration}>
								{t('login.need-account-2')}
							</Link>{' '}
							{t('login.need-account-3')}
						</Text.Body>
					</Panel.Content>
				</Panel.Frame>
			</Layout.Centered>
		</Layout.Minimal>
	);
}

export default Login;
