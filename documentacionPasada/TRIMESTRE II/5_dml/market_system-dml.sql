-- Insertar datos
--Usuario
INSERT INTO users (names, mail, phone) VALUES (?,?,?);

INSERT INTO owner (password, id_users) VALUES (?,?);

INSERT INTO permissions (
  permission_sales,
  permissions_users, 
  permission_inventories, 
  permission_bill, 
  id_owner) 
  VALUES (
    ?,?,?,?,?
  );

INSERT INTO employee (position) VLAUES (?);

-- Inventario
INSERT INTO inventory (
storage, 
date_purchase, 
unit_price, 
due_date, 
product, 
quantity_products)
VALUES (
  ?,?,?,?,?,?
)

-- Reporte ventas diarias
INSERT INTO daily_report (report_date) VALUES (?)

-- Facturas
INSERT INTO bill (creation_date) VALUES (?);

-- Ventas diarias
INSERT INTO sales (
quantity_sold, 
names_customer, 
product_sold, 
id_customer, 
id_bill, 
id_daily_report
id_inventory
) VALUES (
  ?,?,?,?,?
);

-- Consultar datos
SELECT u.name, u.mail, o.password, p.permissions, e.position
FROM users u
JOIN owner o ON u.id_users = o.id_users
JOIN permissions p ON o.id_owner = p.id_permissions
JOIN employee e ON p.id_permissions = e.id_employee;

-- Actualizar datos
UPDATE users
SET name = ?
WHERE id = 1;

UPDATE owner
SET password = ?
WHERE id = 1;

UPDATE permissions
SET permissions_sales = ?
WHERE id = 1;

UPDATE employee
SET position = ?
WHERE id = 1;

-- Eliminar datos
DELETE FROM users WHERE id = ?;

DELETE FROM owner WHERE id = ?;

DELETE FROM permissions WHERE id = ?;

DELETE FROM employee WHERE id = ?;

