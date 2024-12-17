const dotenv = require("dotenv");
dotenv.config();

const validateApiKey = (req, res, next) => {
  const clientApiKey = req.headers["x-api-key"]; // Extract API key from headers

  if (!clientApiKey || clientApiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: "Access denied. Invalid API key." });
  }

  next(); // Allow request to proceed if API key is valid
};

module.exports = validateApiKey;
