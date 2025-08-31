-- Create DB resume_builder first (run as admin)
-- CREATE DATABASE resume_builder CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- users

CREATE TABLE IF NOT EXISTS users (
  user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- resumes
CREATE TABLE IF NOT EXISTS resumes (
  resume_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  title VARCHAR(255),
  version INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- personal_info (1:1)
CREATE TABLE IF NOT EXISTS personal_info (
  info_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  resume_id BIGINT NOT NULL UNIQUE,
  full_name VARCHAR(255),
  phone VARCHAR(50),
  address VARCHAR(500),
  linkedin VARCHAR(255),
  github VARCHAR(255),
  portfolio VARCHAR(255),
  FOREIGN KEY (resume_id) REFERENCES resumes(resume_id) ON DELETE CASCADE
);

-- education, experience, projects, skills, certificates, areas_of_improvement...
-- Use TEXT/long fields for descriptions, JSON for payload snapshots (MySQL 5.7+)
CREATE TABLE IF NOT EXISTS resume_versions (
  version_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  resume_id BIGINT NOT NULL,
  version INT NOT NULL,
  payload_json JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (resume_id) REFERENCES resumes(resume_id) ON DELETE CASCADE
);
