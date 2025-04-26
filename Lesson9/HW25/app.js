import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import guestsRoutes from "./routes/guests.js";
import roomsRoutes from "./routes/rooms.js";
import bookingsRoutes from "./routes/bookings.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/guests", guestsRoutes);
app.use("/rooms", roomsRoutes);
app.use("/bookings", bookingsRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
