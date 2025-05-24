import app from "../src/app.mjs";
import serverless from "serverless-http";

export default async function handler(req, res) {
  return serverless(app)(req, res);
}