import app from "../../src/app.mjs";
import serverless from 'serverless-http';

export const handler = serverless(app);