import express from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import userRoutes from "./routes/user.routes.mjs";
import specs from "./swagger.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => {
  res.send(`¡El servidor backend está funcionando! en el puerto ${port}`);
})

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
})