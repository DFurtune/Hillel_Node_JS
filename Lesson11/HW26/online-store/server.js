const express = require("express");
const app = express();
const productsRoutes = require("./routes/products");
const ordersRoutes = require("./routes/orders");

app.use(express.json());

// Use routes
app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});