import classNames from 'classnames';
import { ReactElement } from 'react';

import * as Frame from '@/components/Frame';
import { Story } from '@/types/story';

type Props = {
	story: Story;
};

function Card({ story }: Props): ReactElement<Props> {
	return (
		<a
			className={classNames(
				'border-none',
				'rounded',
				'shadow',
				'block',
				'overflow-hidden',
				'transform',
				'scale-95',
				'hover:scale-100',
				'transition-all',
				'duration-100',
				'ease-linear'
			)}
			href={story.imageUrlMedium}
		>
			<Frame.Square>
				<img
					alt={story.name}
					className="h-full w-full object-cover"
					src={story.imageUrlMedium}
				/>
			</Frame.Square>
		</a>
	);
}

export default Card;
