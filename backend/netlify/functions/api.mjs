import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import serverless from 'serverless-http';
import swaggerUI from 'swagger-ui-express';

import * as userController from './src/controllers/users.controller.mjs';
import userRoutes from './src/routes/user.routes.mjs';
import salesRoutes from './src/routes/sales.routes.mjs';
import inventoryRoutes from './src/routes/inventory.routes.mjs';
import app from './src/app.mjs';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
const swaggerFilePath = path.resolve(process.cwd(),'./swagger.json');
let swaggerDocumentation;
try {
  const swaggerFileContent = fs.readFileSync(swaggerFilePath, 'utf8');
  swaggerDocumentation = JSON.parse(swaggerFileContent);
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
} catch (error) {
  console.error('Error al leer o parsear swagger.json:', error);
}

app.use("/api/inventory", inventoryRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/users", userRoutes);
app.post("/api/auth/login", userController.loginUser);

app.get("/hello", (req, res) => {
  res.json({ message: "¡Hola desde la función API de Netlify!" });
});

export const handler = serverless(app);