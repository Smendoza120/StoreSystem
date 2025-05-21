import swaggerJsdoc from "swagger-jsdoc";
import fs from "fs";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.1", // O la versión de OpenAPI que desees
    info: {
      title: "API de Control de Inventario",
      version: "1.0.0",
      description:
        "Esta API permite gestionar los inventarios de una tienda y la administración de usuarios.",
    },
    servers: [
      {
        url: "http://localhost:3000", // Asegúrate de que la URL base de tu API sea correcta
      },
    ],
  },
  apis: ["./src/swagger-docs/*.yaml"], // Especifica la ruta a tus archivos .yaml
};

const swaggerSpec = swaggerJsdoc(options);
const swaggerFile = path.resolve("./swagger.json");

fs.writeFileSync(swaggerFile, JSON.stringify(swaggerSpec, null, 2));
