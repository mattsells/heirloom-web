import dotenv from 'dotenv';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { HttpClient } from '@/lib/http';
import App from '@/pages/App';
import ApiContext from '@/context/api';

import reportWebVitals from './reportWebVitals';

// Create a new client instance and add to context
const api = new HttpClient();

// Import env variables from file
dotenv.config();

ReactDOM.render(
	<StrictMode>
		<ApiContext.Provider value={api}>
			<App />
		</ApiContext.Provider>
	</StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
