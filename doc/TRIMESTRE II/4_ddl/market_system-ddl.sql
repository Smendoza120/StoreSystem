-- Eliminar base de datos
DROP DATABASE market_system_bbdd;

-- Creacion de base de datos
CREATE DATABASE market_system_bbdd;

-- Usar base de datos
USE market_system_bbdd;

-- Creacion de tablas 
CREATE TABLE  users (
  id_users INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  INDEX names_users_idx (names ASC),
  INDEX mail_users2_idx (mail ASC),
  INDEX phone_users_idx (phone ASC),
  names VARCHAR(100) NOT NULL,
  mail VARCHAR(100) NOT NULL,
  phone VARCHAR (20) NOT NULL
)
ENGINE = InnoDB;


CREATE TABLE  owner (
  id_owner INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  password VARCHAR(50) NOT NULL,
  id_users INT NOT NULL,
  INDEX fk_owner_users1_idx (id_users ASC),
  CONSTRAINT fk_owner_users1
    FOREIGN KEY (id_users)
    REFERENCES users (id_users)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE  employee (
  id_employee INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  position VARCHAR(50) NOT NULL
  )
ENGINE = InnoDB;

CREATE TABLE  permissions (
  id_permissions INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  permission_sales TINYINT NULL,
  permissions_users TINYINT NULL,
  permission_inventories TINYINT NULL,
  permission_bill TINYINT NULL,
  id_owner INT NOT NULL,
  id_employee INT NOT NULL,
  INDEX fk_employee_owner1_idx (id_owner ASC),
  CONSTRAINT fk_employee_owner1
    FOREIGN KEY (id_owner)
    REFERENCES owner (id_owner)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  INDEX fk_owner_employee_idx (id_employee ASC),
  CONSTRAINT fk_owner_employee
    FOREIGN KEY (id_employee)
    REFERENCES employee (id_employee)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


CREATE TABLE  customer (
  id_customer INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_users INT NOT NULL,
  INDEX fk_customer_users1_idx (id_users ASC),
  CONSTRAINT fk_customer_users1
    FOREIGN KEY (id_users)
    REFERENCES users (id_users)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE  bill (
  id_bill INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  creation_date DATE NOT NULL)
ENGINE = InnoDB;

CREATE TABLE  daily_report (
  id_daily_report INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  report_date DATE NOT NULL)
ENGINE = InnoDB;

CREATE TABLE  inventory (
  id_inventory INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  storage VARCHAR(45) NOT NULL,
  date_purchase DATE NOT NULL,
  unit_price FLOAT NOT NULL,
  due_date DATE NOT NULL,
  product VARCHAR(100) NOT NULL,
  quantity_products INT NOT NULL)
ENGINE = InnoDB;

CREATE TABLE  sales (
  id_sales INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  quantity_sold INT NOT NULL,
  names_customer VARCHAR(100) NULL,
  product_sold VARCHAR(100) NOT NULL,
  id_customer INT NOT NULL,
  id_bill INT NOT NULL,
  id_daily_report INT NOT NULL,
  id_inventory INT NOT NULL,
  INDEX fk_sales_customer1_idx (id_customer ASC),
  INDEX fk_sales_bill1_idx (id_bill ASC),
  INDEX fk_sales_daily_report1_idx (id_daily_report ASC),
  INDEX fk_sales_inventory1_idx (id_inventory ASC),
  CONSTRAINT fk_sales_customer1
    FOREIGN KEY (id_customer)
    REFERENCES customer (id_customer)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_sales_bill1
    FOREIGN KEY (id_bill)
    REFERENCES bill (id_bill)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_sales_daily_report1
    FOREIGN KEY (id_daily_report)
    REFERENCES daily_report (id_daily_report)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_sales_inventory1
    FOREIGN KEY (id_inventory)
    REFERENCES inventory (id_inventory)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- Modificar una tablas
-- Agregar una columna
ALTER TABLE users
ADD identify VARCHAR(30);

-- Eliminar una columna
ALTER TABLE users
DROP COLUMN identify;

-- Modificar datos de una columna
ALTER TABLE users
MODIFY identify DOUBLE(30);

-- Cambiar el nombre de una columna
ALTER TABLE users
CHANGE identify document VARCHAR(30);

-- Agregar una restriccion
ALTER TABLE users
ADD CONSTRAINT fk_id_users PRIMARY KEY (id_users);

-- Vistas
CREATE VIEW user_view AS
SELECT * FROM users;

CREATE VIEW owner_view AS
SELECT * FROM owner;

CREATE VIEW permissions_view AS
SELECT * FROM permissions;

CREATE VIEW employee_view AS
SELECT * FROM employee;

CREATE VIEW customer_view AS
SELECT * FROM customer;

CREATE VIEW sales_view AS
SELECT * FROM sales;

CREATE VIEW inventory_view AS
SELECT * FROM inventory;

CREATE VIEW bill_view AS
SELECT * FROM bill;

CREATE VIEW daily_report_view AS
SELECT * FROM daily_report;

