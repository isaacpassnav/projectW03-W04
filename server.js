const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const setupSwaggerDocs = require("./config/swagger");
const session = require("express-session");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const ensureAuth = require("./middleware/authMiddleware");

require("dotenv").config(); 
require("./config/passport");

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors()); 
app.use(express.json()); 

connectDB(); 

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes)
app.use("/api/products", ensureAuth, productRoutes);
app.use("/api/orders", ensureAuth, orderRoutes)

setupSwaggerDocs(app);
app.listen(PORT, () => {
    console.log(`✅ Web server running at port: ${PORT}`);
});