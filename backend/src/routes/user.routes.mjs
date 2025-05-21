import express from "express";
const router = express.Router();
import * as userController from "../controllers/users.controller.mjs";

/**
 * @swagger
 * /api/users:
 * post:
 * summary: Crea un nuevo usuario.
 * description: Crea un nuevo usuario con la información proporcionada, asignando roles y permisos.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - fullName
 * - email
 * - password
 * properties:
 * fullName:
 * type: string
 * example: John Doe
 * email:
 * type: string
 * format: email
 * example: john.doe@example.com
 * password:
 * type: string
 * example: securePassword123
 * roles:
 * type: array
 * items:
 * type: string
 * enum: [admin, employee, developer]
 * example: [employee]
 * responses:
 * '201':
 * description: Usuario creado exitosamente.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/UserCreationResponse'
 * example:
 * success: true
 * message: Usuario "johndoe1234" creado exitosamente.
 * data:
 * id: "a1b2c3d4-e5f6-7890-1234-567890abcdef"
 * username: "johndoe1234"
 * '400':
 * description: Error si los campos requeridos no se proporcionan o son inválidos.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ErrorResponse'
 * example:
 * success: false
 * message: Todos los campos requeridos (fullName, email, password) deben ser proporcionados.
 * '409':
 * description: Error si el correo electrónico ya está registrado.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ErrorResponse'
 * example:
 * success: false
 * message: El correo electrónico ya está registrado.
 * tags:
 * - Users
 * get:
 * summary: Obtiene TODOS los usuarios (habilitados y deshabilitados).
 * description: Retorna una lista completa de todos los usuarios registrados en el sistema, incluyendo los deshabilitados.
 * responses:
 * '200':
 * description: Lista de todos los usuarios.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/UserListResponse' # Reutilizamos este schema
 * example:
 * success: true
 * message: Todos los usuarios recuperados exitosamente.
 * data:
 * - id: "a1b2c3d4-e5f6-7890-1234-567890abcdef"
 * fullName: "John Doe"
 * username: "johndoe1234"
 * email: "john.doe@example.com"
 * roles: ["employee"]
 * isEnabled: true
 * permissions: { "control_usuarios": { "read": false, "write": false, "delete": false }, "inventario": { "read": false, "write": false, "delete": false }, "ventas_diarias": { "read": true, "write": true, "delete": false } }
 * - id: "b2c3d4e5-f6a7-8901-2345-67890abcdef0"
 * fullName: "Jane Smith"
 * username: "janesmith5678"
 * email: "jane.smith@example.com"
 * roles: ["admin"]
 * isEnabled: false # Un ejemplo de usuario deshabilitado
 * permissions: { "control_usuarios": { "read": true, "write": true, "delete": true }, "inventario": { "read": true, "write": true, "delete": true }, "ventas_diarias": { "read": true, "write": true, "delete": true } }
 * tags:
 * - Users
 */
router.post("/", userController.createUser);
router.get("/", userController.getAllUsers); // Ahora esta ruta obtiene TODOS

/**
 * @swagger
 * /api/users/enabled:
 * get:
 * summary: Obtiene solo los usuarios habilitados.
 * description: Retorna una lista de usuarios que están activos en el sistema (isEnabled: true).
 * responses:
 * '200':
 * description: Lista de usuarios habilitados.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/UserListResponse' # Reutilizamos este schema
 * example:
 * success: true
 * message: Usuarios habilitados recuperados exitosamente.
 * data:
 * - id: "a1b2c3d4-e5f6-7890-1234-567890abcdef"
 * fullName: "John Doe"
 * username: "johndoe1234"
 * email: "john.doe@example.com"
 * roles: ["employee"]
 * isEnabled: true
 * permissions: { "control_usuarios": { "read": false, "write": false, "delete": false }, "inventario": { "read": false, "write": false, "delete": false }, "ventas_diarias": { "read": true, "write": true, "delete": false } }
 * tags:
 * - Users
 */
router.get("/enabled", userController.getEnabledUsers); // Nueva ruta para solo habilitados

/**
 * @swagger
 * /api/users/{id}:
 * get:
 * summary: Obtiene un usuario por su ID.
 * description: Retorna la información de un usuario específico basado en el ID proporcionado.
 * parameters:
 * - in: path
 * name: id
 * required: true
 * description: ID del usuario a obtener.
 * schema:
 * type: string
 * example: a1b2c3d4-e5f6-7890-1234-567890abcdef
 * responses:
 * '200':
 * description: Usuario encontrado.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/UserResponse'
 * example:
 * success: true
 * message: Usuario encontrado.
 * data:
 * id: "a1b2c3d4-e5f6-7890-1234-567890abcdef"
 * fullName: "John Doe"
 * username: "johndoe1234"
 * email: "john.doe@example.com"
 * roles: ["employee"]
 * isEnabled: true
 * permissions: { "control_usuarios": { "read": false, "write": false, "delete": false }, "inventario": { "read": false, "write": false, "delete": false }, "ventas_diarias": { "read": true, "write": true, "delete": false } }
 * '404':
 * description: Usuario no encontrado o deshabilitado.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ErrorResponse'
 * example:
 * success: false
 * message: Usuario no encontrado o deshabilitado.
 * tags:
 * - Users
 * put:
 * summary: Actualiza la información de un usuario por su ID.
 * description: Permite actualizar los detalles de un usuario específico. Todos los campos en el cuerpo son opcionales, pero al menos uno debe ser proporcionado.
 * parameters:
 * - in: path
 * name: id
 * required: true
 * description: ID del usuario a actualizar.
 * schema:
 * type: string
 * example: a1b2c3d4-e5f6-7890-1234-567890abcdef
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * fullName:
 * type: string
 * example: Jane Doe
 * email:
 * type: string
 * format: email
 * example: jane.doe@example.com
 * password:
 * type: string
 * example: newSecurePassword456
 * roles:
 * type: array
 * items:
 * type: string
 * enum: [admin, employee, developer]
 * example: [admin]
 * permissions:
 * type: object
 * example: { "control_usuarios": { "read": true, "write": true, "delete": true }, "inventario": { "read": true, "write": true, "delete": true }, "ventas_diarias": { "read": true, "write": true, "delete": true } }
 * minProperties: 1
 * responses:
 * '200':
 * description: Información del usuario actualizada exitosamente.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/UserUpdateResponse'
 * example:
 * success: true
 * message: Información del usuario actualizada exitosamente.
 * data:
 * id: "a1b2c3d4-e5f6-7890-1234-567890abcdef"
 * username: "janedoe5678"
 * '400':
 * description: Error si los datos de actualización son inválidos.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ErrorResponse'
 * example:
 * success: false
 * message: El ID del producto es requerido para la actualización.
 * '404':
 * description: Usuario no encontrado o deshabilitado.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ErrorResponse'
 * example:
 * success: false
 * message: Usuario no encontrado o deshabilitado.
 * '409':
 * description: El nuevo correo electrónico ya está en uso por otro usuario.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ErrorResponse'
 * example:
 * success: false
 * message: El nuevo correo electrónico ya está en uso por otro usuario.
 * tags:
 * - Users
 */
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);

/**
 * @swagger
 * /api/users/{id}/disable:
 * patch:
 * summary: Deshabilita un usuario por su ID.
 * description: Marca a un usuario específico como deshabilitado. Esto no elimina el usuario, solo lo inactiva.
 * parameters:
 * - in: path
 * name: id
 * required: true
 * description: ID del usuario a deshabilitar.
 * schema:
 * type: string
 * example: a1b2c3d4-e5f6-7890-1234-567890abcdef
 * responses:
 * '200':
 * description: Usuario deshabilitado exitosamente.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/UserDisableResponse'
 * example:
 * success: true
 * message: Usuario con ID "a1b2c3d4-e5f6-7890-1234-567890abcdef" deshabilitado exitosamente.
 * '404':
 * description: Usuario no encontrado o ya deshabilitado.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ErrorResponse'
 * example:
 * success: false
 * message: Usuario no encontrado o ya está deshabilitado.
 * tags:
 * - Users
 */
router.patch("/:id/disable", userController.disableUser);

/**
 * @swagger
 * /api/auth/login:
 * post:
 * summary: Inicia sesión de usuario.
 * description: Permite iniciar sesión con correo electrónico o nombre de usuario y contraseña.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - identifier
 * - password
 * properties:
 * identifier:
 * type: string
 * description: Correo electrónico o nombre de usuario del usuario.
 * example: john.doe@example.com
 * password:
 * type: string
 * description: Contraseña del usuario.
 * example: securePassword123
 * responses:
 * '200':
 * description: Inicio de sesión exitoso. Devuelve un token de autenticación (simulado por ahora).
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/LoginResponse'
 * example:
 * success: true
 * message: Inicio de sesión exitoso
 * token: "generated_uuid_token_example"
 * '400':
 * description: Se deben proporcionar el identificador y la contraseña.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ErrorResponse'
 * example:
 * success: false
 * message: Se deben proporcionar el correo electrónico/usuario y la contraseña.
 * '401':
 * description: Credenciales inválidas o usuario deshabilitado.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ErrorResponse'
 * example:
 * success: false
 * message: Credenciales inválidas.
 * tags:
 * - Authentication
 */
router.post("/login", userController.loginUser);

export default router;
