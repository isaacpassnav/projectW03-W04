const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const setupSwaggerDocs = require("./config/swagger");

require("dotenv").config(); 


const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors()); 
app.use(express.json()); 

connectDB(); 

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes)

setupSwaggerDocs(app);
app.listen(PORT, () => {
    console.log(`✅ Web server running at port: ${PORT}`);
});
