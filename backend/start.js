const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  password: process.env.MYSQL_PASSWORD,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
});
const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.get("/time", (req, res) => {
  pool.query("SELECT NOW() as curr_date_and_time", function (err, results) {
    if (err instanceof Error) {
      res.status(500).json({ message: "Something when wrong" });
    } else {
      res.json({
        message: "success",
        time: results[0]["curr_date_and_time"],
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
