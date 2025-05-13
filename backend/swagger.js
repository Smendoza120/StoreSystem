import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger.json";
const endPointsFiles = ["./server.mjs"];

const doc = {
  info: {
    title: "API de Control de invenatario",
    description: "Esta API permite gestionar los invenarios de una tienda"
  },
  host: "localhost:3000",
  schemes: ["http", "https"],
};

swaggerAutogen()(outputFile, endPointsFiles, doc);

