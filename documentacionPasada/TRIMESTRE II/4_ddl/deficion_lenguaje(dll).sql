/* --------------------------- Definicion del lenguaje ----------------------------------*/
/*01 - Mostrar bases de datos       -------- SHOW DATABASES                              */
/*02 - Usar bases de datos          -------- USE ___                                     */
/*03 - Eliminar base de datos       -------- DROP DATABASE ___                           */
/*04 - Mostrar tablas               -------- SHOW TABLES                                 */
/*05 - Mostrar columnas             -------- SHOW COLUMNS FROM ___ or DESCRIBE ___       */
/*06 - Agregar columna              -------- ALTER TABLE ___ ADD ___                     */
/*07 - Renombrar columna            -------- ALTER TABLE ___ CHANGE ___                  */
/*08 - Eliminar Columna             -------- ALTER TABLE ___ DROP ___                    */
/*09 - Agregar valor a la columna   -------- ALTER TABLE ___ ALTER ___ SET DEFAULT ___   */
/*10 - Eliminar valor a la columna  -------- ALTER TABLE ___ ALTER ___ DROP DEFAULT      */
/*11 - Mostrar creacion tabla       -------- SHOW CREATE TABLE ___                       */
/*12 - Eliminar restriccion         -------- ALTER TABLE ___ DROP CONSTRAINT ___         */
/*13 - Eliminar indice              -------- ALTER TABLE ___ ALTER ___ DROP INDEX ___    */
/*14 - Eliminar llave primaria      -------- ALTER TABLE ___ ALTER ___ DROP PRIMARY KEY  */
/*15 - Limpiar registros            -------- TRUNCATE ___                                */
/*16 - Eliminar tabla               -------- DROP TABLE ___                              */
/*17 - Crear tabla                  -------- CREATE TABLE ___ (___ , ___)                */
/*18 - Renombrar tabla              -------- RENAME TABLE ___ TO ___                     */
/*19 - Crear llave primaria         -------- ALTER TABLE ___ ADD PRIMARY KEY (___)       */
/*20 - Crear indice campo           -------- CREATE INDEX ___ ON ___ (___)               */
/*21 - Crear indice multicampo      -------- CREATE INDEX ___ ON ___ (___ , ___)         */
/*22 - Crear indice unico           -------- CREATE UNIQUE INDEX ___ ON ___ (___)        */
/*23 - Crear restriccion            -------- ALTER TABLE ___ ADD CONTRAINT ___           */
/*23.1 FOREIGN KEY (___) REFERENCES ___ (___) ON DELETE CASCADE ON UPDATE CASCADE        */

-- -----------------------------------------------------
-- Para ingresar a MYSQL desde la consola tiene que dirigirse a la siguiente ruta
-- XAMPP / SHELL / cd mysql/bin / mysql 
-- -----------------------------------------------------
-- Luego tiene que ingresar el siguiente comando
-- -h localhost -u root -p / ENTER
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 01 - Mostrar una base de datos
SHOW DATABASES;
-- -----------------------------------------------------

-- -----------------------------------------------------
-- 02 - Usar bases de datos
USE marketsystem;
-- -----------------------------------------------------

-- 03 - Eliminar base de datos
DROP DATABASE marketsystem;
-- -----------------------------------------------------

-- 04 - Mostrar tablas
SHOW TABLES;
-- -----------------------------------------------------

-- 05 - Mostrar columnas  
SHOW COLUMNS FROM usuarios; 
SHOW COLUMNS FROM inventario; -- Esta tabla es de inventarios
-- OR
DESCRIBE usuarios;
-- -----------------------------------------------------

-- 06 - Agregar columna
ALTER TABLE usuarios ADD COLUMN precio VARCHAR(50);
-- -----------------------------------------------------

-- 07 - Renombrar columna
ALTER TABLE usuarios CHANGE COLUMN precio precio_total DOUBLE(50);
-- -----------------------------------------------------

-- 08 - Eliminar Columna
ALTER TABLE usuarios DROP precio_total;
-- -----------------------------------------------------

-- 09 - Agregar valor a la columna
ALTER TABLE usuarios ALTER precio_total SET DEFAULT 2;
-- -----------------------------------------------------

-- 10 - Eliminar valor a la columna
ALTER TABLE usuarios ALTER precio_total DROP DEFAULT;
-- -----------------------------------------------------

-- 11 - Mostrar creacion tabla
SHOW CREATE TABLE usuarios;
SHOW CREATE TABLE credenciales;
SHOW CREATE TABLE mensajes;
-- -----------------------------------------------------

-- 12 - Eliminar restriccion
ALTER TABLE usuarios DROP CONSTRAINT fk_usuario_rol;
ALTER TABLE mensajes DROP CONSTRAINT fk_mensaje_usuario;
ALTER TABLE credenciales DROP CONSTRAINT fk_evitarPersona;
-- -----------------------------------------------------

-- 13 - Eliminar indice
ALTER TABLE usuarios DROP INDEX ind_usuario_rol;
ALTER TABLE mensajes DROP INDEX ind_mensaje_usuario;
ALTER TABLE credenciales DROP INDEX ind_evitarPersona;
-- -----------------------------------------------------

-- 14 - Eliminar llave primaria
ALTER TABLE usuarios DROP PRIMARY KEY;
ALTER TABLE mensajes DROP PRIMARY KEY;
-- -----------------------------------------------------

-- 15 - Limpiar registros 
TRUNCATE usuarios;
-- -----------------------------------------------------

-- 16 - Eliminar tabla
DROP TABLE usuarios;
-- -----------------------------------------------------

-- 17 - Crear tabla
CREATE TABLE usuarios (
  codigo_usuarios INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(30) NOT NULL,
  apellido VARCHAR(30) NOT NULL
)
-- -----------------------------------------------------

-- 18 - Renombrar tabla
RENAME TABLE usuarios to perfiles;
RENAME TABLE perfiles to usuarios;
-- -----------------------------------------------------

-- 19 - Crear llave primaria
ALTER TABLE usuarios ADD PRIMARY KEY(codigo_usuarios);
-- -----------------------------------------------------

-- 20 - Crear indice campo 
CREATE INDEX codigo_usuarios ON usuarios (codigo_usuarios); 
-- -----------------------------------------------------

-- 21 - Crear indice multicampo
CREATE INDEX codigo_usuarios on usuarios (codigo_usuarios, nombre);
-- -----------------------------------------------------

-- 22 - Crear indice unico 
CREATE UNIQUE INDEX ind_usuario_rol on usuarios (codigo_usuarios);
-- -----------------------------------------------------

-- 23 - Crear restriccion 
ALTER TABLE usuarios ADD 
CONSTRAINT fk_usuario_rol 
  FOREIGN KEY (codigo_usuarios) 
  REFERENCES perfiles (codigo_usuarios)
  ON DELETE CASCADE,
  ON UPDATE CASCADE;
-- -----------------------------------------------------