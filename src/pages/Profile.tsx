import { Application } from '@/components/Layout';
import useSession from '@/hooks/useSession';

function Profile() {
	const { user } = useSession();

	return (
		<Application>
			<h1>Profile</h1>
			<pre>{JSON.stringify(user, null, 2)}</pre>
		</Application>
	);
}

export default Profile;
