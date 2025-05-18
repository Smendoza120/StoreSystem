import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
import userRoutes from "./routes/user.routes.mjs";
import inventoryRoutes from "./routes/inventory.routes.mjs";
import salesRoutes from "./routes/sales.routes.mjs";
import swaggerUI from "swagger-ui-express";
import * as userController from "./controllers/users.controller.mjs";

const app = express();
const port = 3000;
const swaggerFilePath = path.resolve('./swagger.json');

let swaggerDocumentation;

app.use(cors());
app.use(express.json());

try {
  const swaggerFileContent = fs.readFileSync(swaggerFilePath, 'utf8');
  swaggerDocumentation = JSON.parse(swaggerFileContent);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
} catch (error) {
  console.error("Error al leer o parsear swagger.json:", error);
}

app.get("/", (req, res) => {
  res.send(`¡El servidor backend está funcionando! en el puerto ${port}`);
});


app.post("/api/auth/login", userController.loginUser);

app.use("/api/users", userRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/sales", salesRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
