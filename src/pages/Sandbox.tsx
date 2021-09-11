import { useState } from 'react';

import * as ListGroup from '@/components/ListGroup';
import { Application } from '@/components/Layout';
import * as Loading from '@/components/Loading';

function Sandbox() {
	const [value, setValue] = useState([]);

	const handleBlur = () => {
		console.log('Blur is done');
	};

	return (
		<Application>
			{/* <h1>Sandbox</h1> */}

			{/* <Input.List onChange={setValue} name="list" value={value} /> */}
			{/* <ListGroup.Bulleted
				label="Ingredients"
				onBlur={handleBlur}
				onChange={setValue}
				name="list"
				values={value}
			/> */}
			<Loading.Placeholder />
		</Application>
	);
}

export default Sandbox;
