-- Create the database
CREATE DATABASE IF NOT EXISTS jobs_db;
USE jobs_db;

-- Create the jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  job_title VARCHAR(255) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  salary VARCHAR(100),
  job_type VARCHAR(50),
  job_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
