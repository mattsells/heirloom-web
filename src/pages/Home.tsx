import useSession from '@/hooks/useSession';

function Profile() {
	const { user } = useSession();

	return (
		<>
			<h1>Home</h1>
			<pre>{JSON.stringify(user, null, 2)}</pre>
		</>
	);
}

export default Profile;
