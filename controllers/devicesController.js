const db = require("../config/DBConfig");
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");

exports.insertDevice = (req, res) => {
  try {
    const { device_name } = req.body;

    // Basic input validation
    if (!device_name) {
      return res.status(400).json({ error: "Device name is required." });
    }

    // Generate a unique ID for device_id using UUID
    const device_id = uuid.v4();
    console.log(device_id);
    // Insert data into the devices_info table
    const query =
      "INSERT INTO devices_info (device_name, device_id) VALUES ( ?, ?)";
    db.query(query, [device_name, device_id], (error, results) => {
      if (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        // Respond with success message
        res.redirect("/dashboard");
        console.log("Data inserted successfully.");
        // res.json({
        //   message: "Data inserted successfully.",
        //   insertedRows: results.affectedRows,
        // });
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// exports.modifyScript = (device_id) => {
//   const originalScriptPath = path.join(
//     __dirname,
//     "..",
//     "scriptinput",
//     "main.py"
//   );

//   const modifiedScriptPath = path.join(
//     __dirname,
//     "..",
//     "scriptOutput",
//     "app.py"
//   );

//   const originalScript = fs.readFileSync(originalScriptPath, "utf-8");
//   const modifiedScript = originalScript + `\n device_id = "${device_id}"`;

//   fs.writeFileSync(modifiedScriptPath, modifiedScript, "utf-8");

//   return modifiedScriptPath;
// };

exports.modifyScript = (device_id) => {
  const originalScriptPath = path.join(
    __dirname,
    "..",
    "scriptinput",
    "main.py"
  );

  const modifiedScriptPath = path.join(
    __dirname,
    "..",
    "scriptOutput",
    "app.py"
  );

  const originalScript = fs.readFileSync(originalScriptPath, "utf-8");

  // Split the original script into lines
  const lines = originalScript.split("\n");

  // Insert the device_id at the beginning of the first line
  lines[0] = `device_id = "${device_id}"\n ${lines[0]}`;

  // Join the modified lines back into a single script
  const modifiedScript = lines.join("\n");

  // Write the modified script to the new file
  fs.writeFileSync(modifiedScriptPath, modifiedScript, "utf-8");

  return modifiedScriptPath;
};
