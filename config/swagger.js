const swagger = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Product and Order API",
    version: "1.0.0",
    description: "API documentation for managing products and orders",
  },
  servers: [
    {
      url: "http://localhost:3030",
      description: "Local server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Asegúrate de documentar las rutas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;