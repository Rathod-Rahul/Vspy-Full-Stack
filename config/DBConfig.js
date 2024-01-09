const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "main_log",
});

// Connect to the database
const Dconnection = connection.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL:", error.message);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = connection;

// fxup olca lwba atwj
// newlearn5047@gmail.com
