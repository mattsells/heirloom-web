import { Formik, FormikErrors } from 'formik';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

import Input from '@/components/Input';
import Label from '@/components/Label';
import * as Layout from '@/components/Layout';
import * as Panel from '@/components/Panel';
import ApiContext from '@/context/api';
import useRedirect from '@/hooks/useRedirect';
import useSession from '@/hooks/useSession';
import { User } from '@/types/user';

const formValues = {
	email: '',
	password: '',
};

type Form = typeof formValues;

function Login() {
	const api = useContext(ApiContext);
	const { redirectTo } = useRedirect();
	const { setSession } = useSession();
	const { t } = useTranslation();

	return (
		<Layout.Minimal>
			<Layout.Centered>
				<Panel.Frame isFloating size="regular">
					<Panel.Content>
						<h1>{t('app.name')}</h1>
						<Formik
							initialValues={formValues}
							validate={(values) => {
								const errors: FormikErrors<Form> = {};

								// TODO: Move validation to a separate lib
								if (!values.email) {
									// TODO: Add i18n for text
									errors.email = 'Required';
								} else if (
									!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
								) {
									errors.email = 'Invalid email address';
								}

								return errors;
							}}
							onSubmit={async (values, actions) => {
								try {
									const { data: user, headers } = await api.create<User>(
										// TODO: Use router import
										'users/sign_in',
										{
											user: {
												email: values.email,
												password: values.password,
											},
										}
									);

									toast.success('Successfully logged in!');
									setSession(user, headers.Authorization);
									redirectTo('/profile');
								} catch (err) {
									// TODO: Handle error messaging system
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
									<Label htmlFor="email">Email</Label>
									<br />
									<Input
										id="email"
										type="email"
										name="email"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.email}
									/>
									<br />
									{errors.email && touched.email && errors.email}
									<br />
									<label htmlFor="password">Password</label>
									<br />
									<input
										id="password"
										type="password"
										name="password"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.password}
									/>
									<br />
									{errors.password && touched.password && errors.password}
									<br />
									<button type="submit" disabled={isSubmitting}>
										Submit
									</button>
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
