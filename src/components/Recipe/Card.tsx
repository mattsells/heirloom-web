import classNames from 'classnames';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import * as Frame from '@/components/Frame';
import { routes } from '@/router';
import { Recipe } from '@/types/recipe';

type Props = {
	recipe: Recipe;
};

function Card({ recipe }: Props): ReactElement<Props> {
	return (
		<Link
			className={classNames(
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
			to={routes.get('recipe', { id: recipe.id })}
		>
			<Frame.Square>
				<div
					className="bg-cover bg-center bg-no-repeat h-full"
					style={{ backgroundImage: `url(${recipe.coverImageUrlSmall})` }}
				>
					<div className="flex items-end h-full p-2">
						<h4 className="text-base text-gray-500">{recipe.name}</h4>
					</div>
				</div>
			</Frame.Square>
		</Link>
	);
}

export default Card;
