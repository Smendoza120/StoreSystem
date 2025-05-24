import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import * as userController from "../../src/controllers/users.controller.mjs"
import userRoutes from '../../src/routes/user.routes.mjs';
import salesRoutes from '../../src/routes/sales.routes.mjs';
import inventoryRoutes from '../../src/routes/inventory.routes.mjs';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

const swaggerFilePath = path.resolve(process.cwd(), 'swagger.json');
let swaggerDocumentation;

try {
  const swaggerFileContent = fs.readFileSync(swaggerFilePath, 'utf8');
  swaggerDocumentation = JSON.parse(swaggerFileContent);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
} catch (error) {
  console.error("Error al leer o parsear swagger.json en src/app.mjs:", error);
}

app.get("/", (req, res) => {
    res.send("¡El servidor backend está funcionando desde la aplicación principal!");
});
app.post("/api/auth/login", userController.loginUser);
app.use("/api/users", userRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/sales", salesRoutes);

export default app;