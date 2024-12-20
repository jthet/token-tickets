const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const eventRoutes = require("./routes/event");
const ticketRoutes = require("./routes/ticket"); // Importing tickets routes
const validateApiKey = require("./middleware/apiKeyMiddleware");

// env
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: [
      "http://tokentickets.tech", // Allow HTTP version
      "http://www.tokentickets.tech", // Allow HTTP www version
      "https://tokentickets.tech", // Allow HTTPS version
      "https://www.tokentickets.tech", // Allow HTTPS www version
    ], // Allow both HTTP and HTTPS versions of the domain
  })
);
app.use(express.json());
app.use("/api/events", validateApiKey, eventRoutes); // Events API routes with API key validation
app.use("/api/tickets", validateApiKey, ticketRoutes); // Tickets API routes with API key validation

// Catch-all for 404
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ error: "An unexpected error occurred" });
});

// Check if we are in a production environment for HTTPS (optional)
if (process.env.NODE_ENV === "production") {
  const https = require("https");
  const fs = require("fs");
  
  
  const privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/tokentickets.tech/privkey.pem",
    "utf8"
  );
  const certificate = fs.readFileSync(
    "/etc/letsencrypt/live/tokentickets.tech/certificate.pem",
    "utf8"
  );
  const ca = fs.readFileSync(
    "/etc/letsencrypt/live/tokentickets.tech/chain.pem",
    "utf8"
  );

  const credentials = { key: privateKey, cert: certificate, ca: ca };

  https.createServer(credentials, app).listen(443, () => {
    console.log("Secure server running on port 443");
  });
} else {
  // Default HTTP server (for local development)
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}
