DROP DATABASE IF EXISTS employeemanager_db;
CREATE DATABASE employeemanager_db;

\c employeemanager_db;

CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);;

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL NOT NULL,
  department INTEGER NOT NULL,
  FOREIGN KEY (department)
  REFERENCES departments(id)
  ON DELETE SET NULL
);;

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
  on DELETE SET NULL
);