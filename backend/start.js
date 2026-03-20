import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import cookieParser from "cookie-parser";
import "dotenv/config";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  password: process.env.MYSQL_PASSWORD,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
});
const app = express();
const port = process.env.PORT;

const corsOptions = {
  credentials: true,
  origin: process.env.ADDRESS,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.get("/get-time", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT NOW() as curr_date_and_time");

    res.json({
      message: "success",
      time: results[0]["curr_date_and_time"],
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: "Something when wrong" });
      return;
    }
  }
});

app.get("/get-cookie", (req, res) => {
  res.cookie("cookie-token", "someToken", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 3600000,
  });
  res.json({
    message: "success",
  });
});

app.post("/send-cookie", (req, res) => {
  const token = req.cookies["cookie-token"];

  if (token == null) {
    return res.sendStatus(500);
  }

  if (token == "someToken") {
    res.json({
      message: "success",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
