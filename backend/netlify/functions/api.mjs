import app from './app.mjs';
import serverless from 'serverless-http';

export const handler = serverless(app);