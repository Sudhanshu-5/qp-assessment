CREATE DATABASE IF NOT EXISTS grocery_store;

USE grocery_store;

CREATE TABLE grocery_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    price DECIMAL(10, 2) NOT NULL,
    inventory INT NOT NULL,
    category VARCHAR(50)
);

INSERT INTO grocery_items (name, price, inventory, category) VALUES 
    ('Apple', 100, 100, 'fruits'),
    ('Banana', 60, 150, 'fruits'),
    ('Carrot', 50, 200, 'vegetables');