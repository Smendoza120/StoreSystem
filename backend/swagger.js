import swaggerjsdoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de Inventario, Ventas y Usuarios",
      version: "1.0.0",
      description: "API para la gestión de inventario, control de ventas y usuarios de la tienda.",
      servers: [
        {
          url: "http://localhost:3000",
          description: "Servidor local",
        },
      ]
    },
  },
  apis: ["./routes/*.mjs", "./routes/*.js"],
};

const specs = swaggerjsdoc(options);
export default specs;