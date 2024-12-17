const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const eventRoutes = require("./routes/event");
const validateApiKey = require("./middleware/apiKeyMiddleware");

//  env
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); 
app.use("/api/events", validateApiKey, eventRoutes); // checks if they have my api key to interact with API
 
// catch all for 404
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ error: "An unexpected error occurred" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
