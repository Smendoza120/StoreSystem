/* ___________________________________ Manipulacion de datos ______________________________________*/
/*1. - Consultas de accion             -------- INSERT INTO, UPDATE, DELETE                        */
/*1.1 - Crear o registrar              -------- INSERT INTO __ VALUES (__, __)                     */
/*1.2 - Actualizar                     -------- UPDATE __ SET __ = __ WHERE __ = __                */
/*1.3 - Eliminar                       -------- DELETE FROM __ WHERE __ = __                       */
/*_________________________________________________________________________________________________*/
/*2. Consultas de seleccion            -------- SELECT                                             */
/*2.1 - Generales                      -------- SELECT * FROM __                                   */
/*2.2 - Especificas                    -------- SELECT __ , __ FROM __                             */
/*2.3 - Con criterios                  -------- SELECT __ FROM __ WHERE __ = __                    */
/*_________________________________________________________________________________________________*/
/*2.4 - Con operadores logicos         -------- OR, AND, NOT                                       */
/*2.4.1 - 0 [OR]                       -------- SELECT __ FROM __ WHERE __ = __ OR __ = __         */
/*2.4.2 - Y [AND]                      -------- SELECT __ FROM __ WHERE __ = __ AND __ = __        */
/*2.4.3 - no [NOT]                     -------- SELECT __ FROM __ WHERE __ NOT IN ( __ )           */
/*_________________________________________________________________________________________________*/
/*2.5 - Con operadores de comparacion  -------- <>, <, <= , >, >=                                  */
/*2.5.1 - Diferente [<>]               -------- SELECT __ FROM __ WHERE __ <> __                   */
/*2.5.2 - Menor que [<]                -------- SELECT __ FROM __ WHERE __ < __                    */
/*2.5.3 - Mayor que [>]                -------- SELECT __ FROM __ WHERE __ > __                    */
/*2.5.4 - Menor o igual [<=]           -------- SELECT __ FROM __ WHERE __ <= __                   */
/*2.5.5 - Mayor o igual [>=]           -------- SELECT __ FROM __ WHERE __ >= __                   */
/*_________________________________________________________________________________________________*/
/*2.6 - Con otros operadores           -------- LIKE '_%', BETWEEN __ AND __, IN (__ , __)         */
/*2.6.1 - Comodin [LIKE '_%]           -------- SELECT __ FROM __ WHERE __ LIKE '_%'               */
/*2.6.2 - Entre [BETWEEN]              -------- SELECT __ FROM __ WHERE __ BETWEEN __ AND __       */
/*2.6.3 - Lista [IN]                   -------- SELECT __ FROM __ WHERE __ IN (__ , __)            */
/*_________________________________________________________________________________________________*/
/*2.7 - Ordenadas                      -------- ORDER BY                                           */
/*2.7.1 - Ascendente [ASC]             -------- SELECT __ FROM __ WHERE __ = __ ORDER BY __ ASC    */
/*2.7.2 - Decendente [DESC]            -------- SELECT __ FROM __ WHERE __ = __ ORDER BY __ DESC   */
/*2.7.3 - Combinadas                   -------- SELECT __ FROM __ WHERE __ = __ ORDER BY __        */
/*_________________________________________________________________________________________________*/
/*2.8 - Calculadas con funciones       -------- GROUP BY __                                        */
/*2.8.1 - Suma [SUM()]                 -------- SELECT __ , SUM( __ ) FROM __ GROUP BY __          */
/*2.8.2 - Promedio [AVG()]             -------- SELECT __ , AVG( __ ) FROM __ GROUP BY __          */
/*2.8.3 - Maximo [MAX()]               -------- SELECT __ , MAX( __ ) FROM __ GROUP BY __          */
/*2.8.4 - Minimo [MIN()]               -------- SELECT __ , MIN( __ ) FROM __ GROUP BY __          */
/*2.8.5 - Conteo [COUNT()]             -------- SELECT __ , COUNT( __ ) FROM __ GROUP BY __        */
/*_________________________________________________________________________________________________*/
/*2.9 - Calculadas con Alias           -------- SELECT __, FUN( __ ) AS __ FROM __                 */
/*2.10 - Calculadas con condicionales  -------- GROUP BY __ HAVING __ = __ OR __ = __              */
/*2.11 - Calculadas con operadores     -------- SELECT __ , __ , ROUND(__ * 0.19, 2) AS __ FROM __ */
/*_________________________________________________________________________________________________*/
/*2.12 - Calculadas con fechas         -------- NOW(), DATE_FORMAT(), TIMESTAMDIFF()               */
/*2.12.1 - Fecha actual                -------- NOW()                                              */
/*2.12.2 - Formato fecha               -------- DATE_FORMAT(NOW(), '%Y-%M-%D')                     */
/*2.12.3 - Formato fechas              -------- TIMESTAMPDIFF(DAY, __, NOW())                      */
/*_________________________________________________________________________________________________*/

/*_________________________________________________________________________________________________*/
/* Para ingresar a MYSQL desde la consola tiene que dirigirse a la siguiente ruta                  */ 
/* XAMPP / SHELL / cd mysql/bin / mysql                                                            */
/*_________________________________________________________________________________________________*/
/* Luego tiene que ingresar el siguiente comando                                                   */
/* -h localhost -u root -p / ENTER                                                                 /*
/*_________________________________________________________________________________________________*/

/*_________________________________________________________________________________________________*/
/*_________________________________1. Consultas de accion [Inicio]_________________________________*/
/*___________________________________INSERT INTO, UPDATE, DELETE___________________________________*/
/*_________________________________________________________________________________________________*/

-- -----------------------------------------------------
-- 1.1 Crear o Registrar
INSERT INTO rol (
  
);
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 1.2 Actualizar
UPDATE roles SET nombre = 'person' WHERE codigo_rol = 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 1.3 Eliminar
DELETE FROM usuarios WHERE codigo_rol = 'admin-2';
-- -----------------------------------------------------

/*_________________________________________________________________________________________________*/
/*____________________________________2. consultas de seleccion____________________________________*/
/*_____________________________________________SELECT______________________________________________*/
/*_________________________________________________________________________________________________*/

-- -----------------------------------------------------
-- 2.1 Generales
SELECT * FROM usuarios;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.2 Especificas
SELECT codigo_rol, correo_user FROM usuarios;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.3 Con Criterios
SELECT codigo_rol, correo_user FROM usuarios WHERE codigo_rol = 3;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.4 Con operadores logicos
-- 2.4.1 O[OR]
SELECT codigo_rol, correo_user FROM usuarios WHERE codigo_rol = 3 OR codigo_rol = 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.4.2 Y[AND]
SELECT codigo_rol, correo_user FROM usuarios WHERE codigo_rol = 3 AND codigo_rol = 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.4.3 NO[NOT]
SELECT codigo_rol, correo_user FROM usuarios WHERE codigo_rol NOT IN 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.5 Con operadores de comparacion
-- 2.5.1 Diferente [<>]
SELECT codigo_rol, correo_user FROM usuarios WHERE codigo_rol <> 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.5.2 Menor que [<]
SELECT codigo_rol, correo_user FROM usuarios WHERE codigo_rol < 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.5.3 Mayor que [>]
SELECT codigo_rol, correo_user FROM usuarios WHERE codigo_rol > 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.5.4 Menor o igual [<=]
SELECT codigo_rol, correo_user FROM usuarios WHERE codigo_rol <= 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.5.5 Mayor o igual [>=]
SELECT codigo_rol, correo_user FROM usuarios WHERE codigo_rol >= 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.6 Con otros operadores
-- 2.6.1 Comodin [Like '_%']
SELECT * FROM usuarios WHERE codigo_rol LIKE 'j%';
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.6.2 Entre [BETWEEN]
SELECT * FROM usuarios WHERE codigo_rol BETWEEN 2 AND 5;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.6.3 Lista [IN ( __ )]
SELECT * FROM usuarios WHERE codigo_rol IN (2);
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.7 Ordenadas
-- 2.7.1 Ascendente [ASC]
SELECT * FROM usuarios WHERE codigo_rol = 2 
ORDER BY codigo_rol ASC;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.7.2 Decendentes [DESC]
SELECT * FROM usuarios WHERE codigo_rol = 2
ORDER BY codigo_rol DESC;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.7.3 Combinadas
SELECT * FROM usuarios WHERE codigo_rol = 2 or codigo_rol = 3
ORDER BY codigo_rol DESC, correo_user DESC;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.8 Calculadas con funciones
-- 2.8.1 Suma [SUM()]
SELECT SUM(codigo_rol) FROM usuarios;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.8.2 Promedio [AVG()]
SELECT AVG(codigo_rol) FROM usuarios WHERE codigo_rol = 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.8.3 Maximo [MAX()]
SELECT MAX(codigo_rol) FROM usuarios WHERE codigo_rol = 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.8.4 Minimo [MIN()]
SELECT MIN(codigo_rol) FROM usuarios WHERE codigo_rol = 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.8.5 Count [COUNT()]
SELECT COUNT(codigo_rol) FROM usuarios WHERE codigo_rol = 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.9 Calculadas con alias
SELECT COUNT(codigo_rol) AS codigo FROM usuarios WHERE codigo_rol = 2;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 2.10 Calculadas Condicionales
SELECT COUNT(codigo_rol) AS codigo FROM usuarios WHERE codigo_rol = 2;
-- -----------------------------------------------------





# USANDO LA BD DEL PRIYECTO

INSERT INTO users (names,mail,phone)
VALUES ("Oscar Aguirre","Oscarpro123@esto.com",3223142717),
("Harold","haroldgay@esto.com",311311322322),
("Cata ","cata@esto.com",123123123123),
("Miguel ","migue97@esto.com",30524154617),
("Luisa ","luis@esto.com",3223141717);

SELECT * FROM users;

INSERT INTO owner (passwords,idusers)
VALUES (123456,5),
(789123,4),
(456789,3),
(123789,2),
(456123,1);

SELECT * FROM owner;

#consulta realizada por metodo left join primero se pone la tabla de donde vamos a traer los datos
#SELECT users.names, users.mail, users.phone, owner.passwords from users left join owner on users.idusers = owner.idusers;
SELECT users.names, users.mail, users.phone, owner.passwords from users inner join owner on users.idusers = owner.idusers;


INSERT INTO customer (idusers)
VALUES (1),
(2);
SELECT * FROM customer;

INSERT INTO bill (creation_date)
VALUES ("2023-05-29"),
  ("2089-05-29"),
  ("2023-05-30"),
  ("2023-06-01");

SELECT * FROM bill;

INSERT INTO daily_report (report_date)
#ingresar datos o crear
 VALUES ("2023-05-29"),
  ("2089-05-29"),
  ("2023-05-30"),
  ("2023-06-01"),
  ("2023-06-07"),
  ("2023-08-01"),
  ("2023-09-01"),
  ("2023-10-01");
# ESTO ES PARA BUSCAR:  SELECT * FROM daily_report WHERE report_date = "2023-06-01";
#ESTO ES PARA ACTUALIZAR UPDATE daily_report SET report_date = "2075-05-29" WHERE iddaily_report = 5;
#ESTO ES PARA BORRAR DELETE from daily_report WHERE iddaily_report = 1;
#select * from daily_report;


INSERT INTO inventory (storage,date_purchase,unit_price,due_date,product,quantity_products)
VALUES("almacen","2023-05-29",5.000,"2030-05-29","Arroz",20),
("almacen","2023-05-29",20.000,"2029-05-29","Aceite",5),
("almacen","2023-05-29",5.00,"2029-05-29","Huevos",10),
("almacen","2023-05-29",2.500,"2030-05-29","Tostadas",15),
("almacen","2023-05-29",7.00,"2030-05-29","bom bom bum",25);
#select * from inventory;

INSERT INTO sales (quantity_sold,names_customer,product_sold,idcustomer,idbill,iddaily_report,idinventory)
VALUES (15,"Oscar Aguirre","Arroz",2,2,2,2),
(1,"Oscar Aguirre","Aceite",3,3,3,3);
select * from sales;
