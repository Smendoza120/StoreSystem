import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import cors from "cors";
import userRoutes from "./routes/user.routes.mjs";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de Inventario, Ventas y Usuarios",
      version: "1.0.0",
      description: "API para la gestión de inventario, control de ventas y usuarios de la tienda.",
    },
  },
  apis: ["./routes/user.routes.mjs"]
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.send(`¡El servidor backend está funcionando! en el puerto ${port}`);
})

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
})