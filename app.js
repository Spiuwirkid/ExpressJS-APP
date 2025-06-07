const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: "lks-rds.cve0gossqwjw.ap-southeast-1.rds.amazonaws.com",
  user: "admin",
  password: "dayusp0O9i8u7y6",
  database: "LKS",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to RDS:", err.stack);
    return;
  }
  console.log("Connected to RDS as id " + connection.threadId);
});

app.get("/", (req, res) => {
  res.send("<h1>Web Service LKS - Success!</h1>");
});

app.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Error fetching data:", err.stack);
      return res.status(500).send("Error fetching data from DB");
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
