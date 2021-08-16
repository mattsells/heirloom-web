import { Formik, FormikErrors } from 'formik';
import { useContext } from 'react';

import ApiContext from '@/context/api';
import useSession from '@/hooks/useSession';
import { User } from '@/types/user';

const formValues = {
	email: '',
	password: '',
};

type Form = typeof formValues;

function Login() {
	const api = useContext(ApiContext);
	const { setSession } = useSession();

	return (
		<div>
			<h1>Login</h1>
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

						setSession(user, headers.Authorization);
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
						<label htmlFor="email">Email</label>
						<br />
						<input
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
		</div>
	);
}

export default Login;
