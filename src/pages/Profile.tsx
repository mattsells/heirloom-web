import useSession from '@/hooks/useSession';

function Profile() {
	const { user } = useSession();

	return (
		<div>
			<h1>Profile</h1>
			<pre>{JSON.stringify(user, null, 2)}</pre>
		</div>
	);
}

export default Profile;
