import { createContext } from 'react';

import { HttpClient } from '@/lib/http';

const ApiContext = createContext<HttpClient>(undefined);

export default ApiContext;
