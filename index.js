const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Temporary in-memory database
const devices = {};

// Endpoint to update device location
app.post("/updateLocation", (req, res) => {
  const { deviceId, lat, lng, helpers } = req.body;

  // Validate request body
  if (!deviceId || !lat || !lng) {
    return res.status(400).json({ error: "Invalid request. Missing deviceId, lat, or lng." });
  }

  // Update device data
  devices[deviceId] = {
    lat,
    lng,
    helpers: helpers || [],
    lastUpdated: new Date(),
  };

  res.json({ success: true, message: "Location updated successfully." });
});

// Endpoint to retrieve device location
app.get("/getLocation", (req, res) => {
  const { deviceId } = req.query;

  // Validate request query
  if (!deviceId || !devices[deviceId]) {
    return res.status(404).json({ error: "Device not found or invalid deviceId." });
  }

  res.json(devices[deviceId]);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
