// import express from "express";
// import path from "path";
// import fs from "fs";
// import cors from "cors";
// import swaggerUI from "swagger-ui-express";
// import * as userController from "./src/controllers/users.controller.mjs";
// import userRoutes from "./src/routes/user.routes.mjs";
// import salesRoutes from "./src/routes/sales.routes.mjs";
// import inventoryRoutes from "./src/routes/inventory.routes.mjs";

// const app = express();
// const port = 3000;

// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));
// app.use(express.json());


// const swaggerFilePath = path.resolve('./swagger.json');

// let swaggerDocumentation;

// app.use(cors());
// app.use(express.json());

// try {
//   const swaggerFileContent = fs.readFileSync(swaggerFilePath, 'utf8');
//   swaggerDocumentation = JSON.parse(swaggerFileContent);
//   app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
// } catch (error) {
//   console.error("Error al leer o parsear swagger.json:", error);
// }

// app.get("/", (req, res) => {
//   res.send(`¡El servidor backend está funcionando! en el puerto ${port}`);
// });

// app.post("/api/auth/login", userController.loginUser);

// app.use("/api/users", userRoutes);
// app.use("/api/inventory", inventoryRoutes);
// app.use("/api/sales", salesRoutes);


// app.listen(port, () => {
//   console.log(`Servidor escuchando en http://localhost:${port}`);
// });

// export default app;

import app from "./src/app.mjs";

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
