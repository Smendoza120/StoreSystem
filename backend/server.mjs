import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
import userRoutes from "./routes/user.routes.mjs";
import swaggerUI from "swagger-ui-express";

const app = express();
const port = 3000;
const swaggerFilePath = path.resolve('./swagger.json');

let swaggerDocumentation;

app.use(cors());
app.use(express.json());

// const swaggerFileContent = fs.readFileSync(swaggerFilePath, 'utf8');
// swaggerDocumentation = JSON.parse(swaggerFileContent);
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));

try {
  const swaggerFileContent = fs.readFileSync(swaggerFilePath, 'utf8');
  swaggerDocumentation = JSON.parse(swaggerFileContent);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
} catch (error) {
  console.error("Error al leer o parsear swagger.json:", error);
  // Considera cómo manejar este error en producción
}


app.get("/", (req, res) => {
  res.send(`¡El servidor backend está funcionando! en el puerto ${port}`);
});


app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
