import { ReactElement } from 'react';

type HeaderStyle = 'h1' | 'h2' | 'h3';

type Props = {
	as?: HeaderStyle;
	children?: string;
};

function Header({ children, as = 'h1' }: Props): ReactElement<Props> {
	switch (as) {
		case 'h1':
			return <h1 className="text-green-400 text-4xl mb-2">{children}</h1>;

		case 'h2':
			return <h2 className="text-gray-600 text-2xl mb-1">{children}</h2>;

		case 'h3':
			return <h3 className="text-gray-700 text-base">{children}</h3>;
	}
}

export default Header;
