const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const ensureAuth = require("../middleware/authMiddleware");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description: "API to manage products and orders",
    },
    servers: [
      {
        url: "https://projectw03-w04.onrender.com/",
      },
      {
        url: "http://localhost:3030",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          required: ["name", "price", "category", "stock"],
          properties: {
            _id: {
              type: "string",
              example: "66422c4c3ba1799d099320e7",
            },
            name: {
              type: "string",
              description: "Product name",
              example: "laptop gamer",
            },
            description: {
              type: "string",
              description: "Description of the product",
              example: "portátil con tarjeta gráfica dedicada",
            },
            price: {
              type: "number",
              format: "float",
              description: "Product price",
              example: 4200.0,
            },
            stock: {
              type: "integer",
              description: "Units available in stock",
              example: 10,
            },
            category: {
              type: "string",
              description: "Product category",
              example: "tecnología",
            },
          },
        },
        Order: {
          type: "object",
          required: ["customerName", "email", "products", "totalAmount"],
          properties: {
            _id: {
              type: "string",
              example: "663e55f0a12b345678901234",
            },
            customerName: {
              type: "string",
              description: "Name of the customer",
              example: "Alice Johnson",
            },
            email: {
              type: "string",
              description: "Customer's email",
              example: "alice@example.com",
            },
            products: {
              type: "array",
              description: "List of products in the order",
              items: {
                type: "object",
                properties: {
                  productId: {
                    type: "string",
                    description: "The ID of the product",
                    example: "66422c4c3ba1799d099320e7",
                  },
                  quantity: {
                    type: "integer",
                    description: "Quantity of the product",
                    example: 2,
                  },
                  price: {
                    type: "number",
                    format: "float",
                    description: "Unit price at time of order",
                    example: 149.99,
                  },
                },
              },
            },
            totalAmount: {
              type: "number",
              description: "Total order amount",
              example: 299.98,
            },
            status: {
              type: "string",
              enum: ["pending", "paid", "shipped", "cancelled"],
              example: "pending",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);
function setupSwaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
module.exports = setupSwaggerDocs;
