import express from "express";
const router = express.Router();
import * as userController from "../controllers/users.controller.mjs";

/**
 * @route POST /api/users
 * @group Users - Operaciones relacionadas con la gestión de usuarios
 * @param {string} fullName.body.required - Nombre completo del usuario
 * @param {string} email.body.required - Correo electrónico del usuario
 * @param {string} password.body.required - Contraseña del usuario
 * @param {array<string>} roles.body - Roles del usuario (opcional, por defecto [])
 * @returns {object} 201 - Usuario creado exitosamente
 * @returns {Error}  400 - Error si los campos requeridos no se proporcionan
 * @returns {Error}  409 - Error si el correo electrónico ya está registrado
 */
router.post('/', userController.createUser);

/**
 * @route GET /api/users
 * @group Users - Operaciones relacionadas con la gestión de usuarios
 * @returns {array<object>} 200 - Lista de todos los usuarios habilitados
 */
router.get('/', userController.getAllUsers);

/**
 * @route GET /api/users/{id}
 * @group Users - Operaciones relacionadas con la gestión de usuarios
 * @param {string} id.path.required - ID del usuario a obtener
 * @returns {object} 200 - Usuario encontrado
 * @returns {Error}  404 - Usuario no encontrado
 */
router.get('/:id', userController.getUserById);

/**
 * @route PUT /api/users/{id}
 * @group Users - Operaciones relacionadas con la gestión de usuarios
 * @param {string} id.path.required - ID del usuario a actualizar
 * @param {string} fullName.body - Nuevo nombre completo del usuario
 * @param {string} email.body - Nuevo correo electrónico del usuario
 * @param {string} password.body - Nueva contraseña del usuario (opcional)
 * @param {array<string>} roles.body - Nuevos roles del usuario
 * @param {object} permissions.body - Nuevos permisos del usuario
 * @returns {object} 200 - Información del usuario actualizada exitosamente
 * @returns {Error}  404 - Usuario no encontrado
 */
router.put('/:id', userController.updateUser);

/**
 * @route PATCH /api/users/{id}/disable
 * @group Users - Operaciones relacionadas con la gestión de usuarios
 * @param {string} id.path.required - ID del usuario a deshabilitar
 * @returns {object} 200 - Usuario deshabilitado exitosamente
 * @returns {Error}  404 - Usuario no encontrado
 */
router.patch('/:id/disable', userController.disableUser);

/**
 * @route POST /api/auth/login
 * @group Authentication - Operaciones de autenticación de usuarios
 * @param {string} identifier.body.required - Correo electrónico o nombre de usuario del usuario.
 * @param {string} password.body.required - Contraseña del usuario.
 * @returns {object} 200 - Inicio de sesión exitoso. Devuelve un token de autenticación (simulado por ahora).
 * @returns {Error}  401 - Credenciales inválidas.
 */
router.post('/login', userController.loginUser);

export default router;