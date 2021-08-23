import { Formik } from 'formik';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import apiRoutes from '@/api/routes';
import { createRegistrationBody } from '@/api/utils/authentication';
import { Submit } from '@/components/Button';
import Form from '@/components/Form';
import * as InputGroup from '@/components/InputGroup';
import * as Layout from '@/components/Layout';
import Link from '@/components/Link';
import * as Panel from '@/components/Panel';
import * as Text from '@/components/Text';
import ApiContext from '@/context/api';
import useRedirect from '@/hooks/useRedirect';
import useSession from '@/hooks/useSession';
import webRoutes from '@/router/routes';
import { User } from '@/types/user';

const formValues = {
	email: '',
	password: '',
	passwordConfirmation: '',
};

const RegistrationSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string().required(),
	passwordConfirmation: Yup.string().required(),
});

function Registration() {
	const client = useContext(ApiContext);
	const { redirectTo } = useRedirect();
	const { setSession } = useSession();
	const { t } = useTranslation();

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
									const { data: user, headers } = await client.create<User>(
										apiRoutes.users.signIn,
										createRegistrationBody(
											email,
											password,
											passwordConfirmation
										)
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
										error={errors.password}
										label={t('fields.passwordConfirmation')}
										name="password-confirmation"
										onBlur={handleBlur}
										onChange={handleChange}
										touched={touched.passwordConfirmation}
										value={values.passwordConfirmation}
									/>

									<Submit disabled={isSubmitting}>
										{t('registration.submit')}
									</Submit>
								</Form>
							)}
						</Formik>
					</Panel.Content>
				</Panel.Frame>
			</Layout.Centered>
		</Layout.Minimal>
	);
}

export default Registration;
