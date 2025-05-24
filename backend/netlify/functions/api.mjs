import app from "../../index.mjs";
import serverless from 'serverless-http';

export const handler = serverless(app);