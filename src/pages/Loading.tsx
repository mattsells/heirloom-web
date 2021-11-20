import * as LoadingIcons from '@/components/Loading';

function Loading() {
	return (
		<div className="flex items-center bg-green-300 h-full justify-center">
			<LoadingIcons.Spinner />
		</div>
	);
}

export default Loading;
