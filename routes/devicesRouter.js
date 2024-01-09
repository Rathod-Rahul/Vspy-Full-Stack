// devicesRouter.js
const express = require("express");
const router = express.Router();
const connection = require("../config/DBConfig");
const { modifyScript } = require("../controllers/devicesController");
const path = require("path");
const authenticateToken = require("../middleware/authMiddleware");
// Define the route for /devices/:deviceId
router.post("/:deviceId", authenticateToken, (req, res) => {
  const deviceId = req.params.deviceId;

  // Fetch data from the database based on device_id
  const query = "SELECT * FROM devices_info WHERE device_id = ?";
  connection.query(query, [deviceId], (error, results, fields) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.length > 0) {
        const device = results[0];
        const modifiedScriptPath = modifyScript(device.device_id);

        // Set the response headers for file download
        res.setHeader(
          "Content-disposition",
          `attachment; filename=${device.device_name}.py`
        );
        res.setHeader("Content-type", "text/plain");

        // Send the modified script as the response
        res.sendFile(path.resolve(modifiedScriptPath));
      } else {
        res.status(404).json({ error: "Device not found" });
      }
    }
  });
});

module.exports = router;
