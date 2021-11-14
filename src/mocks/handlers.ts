import { RestHandler } from 'msw';

import routes from './routes';

export const handlers: RestHandler[] = [...routes];
