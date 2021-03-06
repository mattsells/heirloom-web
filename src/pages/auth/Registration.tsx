import { Formik } from 'formik';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Redirect, useHistory } from 'react-router';
import * as Yup from 'yup';

import { createRegistrationBody } from '@/api/utils/authentication';
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
import routes from '@/router/routes';
import { User } from '@/types/user';

const formValues = {
	email: '',
	password: '',
	passwordConfirmation: '',
};

// TODO: Add translations
const RegistrationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Not a valid email')
		.required()
		.max(256, 'Email is too long (max 256 characters)'),
	password: Yup.string().required(),
	passwordConfirmation: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Passwords must match')
		.required(),
});

function Registration() {
	const http = useHttpClient();
	const history = useHistory();
	const { isAuthenticated, setSession } = useSession();
	const { t } = useTranslation();

	if (isAuthenticated) {
		return <Redirect to={routes.get('recipes')} />;
	}

	return (
		<Layout.Minimal>
			<Layout.Centered>
				<Panel.Frame isFloating size="regular">
					<Panel.Content>
						<Text.Header>{t('registration.title')}</Text.Header>
						<Formik
							initialValues={formValues}
							validationSchema={RegistrationSchema}
							onSubmit={async ({ email, password, passwordConfirmation }) => {
								try {
									const { data: user, headers } = await http.create<User>(
										'users.signUp',
										{
											body: createRegistrationBody(
												email,
												password,
												passwordConfirmation
											),
										}
									);

									toast.success(t('authentication.loginSuccess'));
									setSession(user, headers.Authorization);
									history.push(routes.get('recipes'));
								} catch (err) {
									// TODO: Check if message is available otherwise show default
									if (err instanceof HttpError) {
										toast.error(err.message);
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
								isValid,
								dirty,
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

									<InputGroup.Password
										error={errors.passwordConfirmation}
										label={t('fields.passwordConfirmation')}
										name="passwordConfirmation"
										onBlur={handleBlur}
										onChange={handleChange}
										touched={touched.passwordConfirmation}
										value={values.passwordConfirmation}
									/>

									<Submit disabled={isSubmitting || !isValid || !dirty}>
										{t('registration.submit')}
									</Submit>
								</Form>
							)}
						</Formik>

						<Text.Body>
							{t('registration.have-account-1')}{' '}
							<Link to={routes.get('login')}>
								{t('registration.have-account-2')}
							</Link>{' '}
							{t('registration.have-account-3')}
						</Text.Body>
					</Panel.Content>
				</Panel.Frame>
			</Layout.Centered>
		</Layout.Minimal>
	);
}

export default Registration;
