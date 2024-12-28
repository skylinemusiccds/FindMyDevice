const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const devices = {}; // Temporary in-memory database

app.post("/updateLocation", (req, res) => {
  const { deviceId, lat, lng, helpers } = req.body;
  if (!deviceId || !lat || !lng) {
    return res.status(400).json({ error: "Invalid request" });
  }
  devices[deviceId] = { lat, lng, helpers: helpers || [], lastUpdated: new Date() };
  res.json({ success: true });
});

app.get("/getLocation", (req, res) => {
  const { deviceId } = req.query;
  if (!devices[deviceId]) {
    return res.status(404).json({ error: "Device not found" });
  }
  res.json(devices[deviceId]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
