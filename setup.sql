CREATE DATABASE IF NOT EXISTS biodata_app;
USE biodata_app;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100),
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS biodata (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  nama_lengkap VARCHAR(100),
  tempat_lahir VARCHAR(100),
  tanggal_lahir DATE,
  jenis_kelamin ENUM('L','P'),
  alamat TEXT,
  no_hp VARCHAR(20),
  asal_sekolah VARCHAR(100),
  foto VARCHAR(255),
  UNIQUE (user_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);