require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "jobs_db",
});

app.get("/api/jobs", (req, res) => {
  db.query("SELECT id, job_title, company_name, location, salary, job_type, job_description, created_at FROM jobs ORDER BY id DESC", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Database error" });
      return;
    }
    res.json(rows);
  });
});

app.post("/api/jobs", (req, res) => {
  if (!req.body || typeof req.body !== "object") {
    res.status(400).json({ message: "Invalid request body" });
    return;
  }
  const { jobTitle, companyName, location, salary, jobType, jobDescription } = req.body;

  const sql = "INSERT INTO jobs (job_title, company_name, location, salary, job_type, job_description) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [jobTitle, companyName, location, salary || null, jobType || null, jobDescription || null], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Database error" });
      return;
    }
    res.status(201).json({ message: "Job created", jobId: result.insertId });
  });
});

const PORT = 5000;
db.connect((err) => {
  if (err) {
    console.error("DB error:", err.message);
    if (err.code === "ER_ACCESS_DENIED_ERROR") {
      console.error("Set DB_PASSWORD in .env to your MySQL password.");
    }
    process.exit(1);
  }
  console.log("Connected to MySQL");
  app.listen(PORT, () => console.log("Server on http://localhost:" + PORT));
});
