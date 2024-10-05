-- Create the database if it doesn't already exist
CREATE DATABASE IF NOT EXISTS ImageGallery;
USE ImageGallery;

-- Create the Images table
CREATE TABLE IF NOT EXISTS Images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    caption VARCHAR(255),
    description TEXT,
    category VARCHAR(100)
);

