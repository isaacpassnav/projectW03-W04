const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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
        url: "https://your-project-name.onrender.com", // 🔁 Replace this with your Render URL
      },
      {
        url: "http://localhost:3030",
      },
    ],
    components: {
      schemas: {
        // 📦 Product schema
        Product: {
          type: "object",
          required: ["name", "price", "category"],
          properties: {
            _id: {
              type: "string",
              example: "663e55a3a12b345678901234"
            },
            name: {
              type: "string",
              description: "Product name",
              example: "Wireless Headphones"
            },
            description: {
              type: "string",
              description: "Short description of the product",
              example: "Bluetooth noise-cancelling headphones"
            },
            price: {
              type: "number",
              format: "float",
              description: "Product price",
              example: 149.99
            },
            category: {
              type: "string",
              description: "Product category",
              example: "Electronics"
            },
            inStock: {
              type: "boolean",
              description: "Whether the product is in stock",
              example: true
            }
          }
        },

        // 📑 Order schema
        Order: {
          type: "object",
          required: ["product", "quantity", "customerName"],
          properties: {
            _id: {
              type: "string",
              example: "663e55f0a12b345678901234"
            },
            product: {
              type: "string",
              description: "Product ID related to the order",
              example: "663e55a3a12b345678901234"
            },
            quantity: {
              type: "integer",
              description: "Number of units ordered",
              example: 2
            },
            customerName: {
              type: "string",
              description: "Name of the customer",
              example: "Alice Johnson"
            },
            status: {
              type: "string",
              description: "Order status (e.g., pending, shipped, delivered)",
              example: "pending"
            }
          }
        }
      }
    }
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwaggerDocs;

