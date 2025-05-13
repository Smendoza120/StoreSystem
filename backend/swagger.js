// import swaggerAutogen from "swagger-autogen";

// const outputFile = "./swagger.json";
// const endPointsFiles = ["./server.mjs"];

// const doc = {
//   info: {
//     title: "API de Control de invenatario",
//     description: "Esta API permite gestionar los invenarios de una tienda"
//   },
//   host: "localhost:3000",
//   schemes: ["http", "https"],
// };

// swaggerAutogen()(outputFile, endPointsFiles, doc);

import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.1', // O la versión de OpenAPI que desees
    info: {
      title: 'API de Control de Inventario',
      version: '1.0.0',
      description: 'Esta API permite gestionar los inventarios de una tienda y la administración de usuarios.',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Asegúrate de que la URL base de tu API sea correcta
      },
    ],
  },
  apis: ['./swagger-docs/*.yaml'], // Especifica la ruta a tus archivos .yaml
};

const swaggerSpec = swaggerJsdoc(options);

import fs from 'fs';
import path from 'path';

const swaggerFile = path.resolve('./swagger.json');

fs.writeFileSync(swaggerFile, JSON.stringify(swaggerSpec, null, 2));

console.log('swagger.json generado correctamente.');