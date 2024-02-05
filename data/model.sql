

DROP DATABASE IF EXISTS weather;
CREATE DATABASE weather;
USE weather;

CREATE TABLE LOCATION (
    

);

CREATE TABLE DAYLOG (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp DATETIME,
    temperature DECIMAL(5,2),
    humidity DECIMAL(5,2)

);