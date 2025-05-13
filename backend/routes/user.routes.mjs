import express from "express";
const router = express.Router();
import * as userController from "../controllers/users.controller.mjs";

/**
 * @swagger
 * /users:
 * post:
 * summary: Crear un nuevo usuario.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * fullName:
 * type: string
 * description: Nombre completo del usuario.
 * email:
 * type: string
 * format: email
 * description: Correo electrónico del usuario.
 * password:
 * type: string
 * description: Contraseña del usuario.
 * roles:
 * type: array
 * items:
 * type: string
 * description: Roles asignados al usuario.
 * responses:
 * 201:
 * description: Usuario creado exitosamente.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * id:
 * type: string
 * description: ID del usuario creado.
 * username:
 * type: string
 * description: Nombre de usuario generado.
 * 400:
 * description: Error en los datos de entrada.
 * 500:
 * description: Error interno del servidor.
 */
router.post('/', userController.createUser);

/**
 * @swagger
 * /users:
 * get:
 * summary: Obtener la lista de todos los usuarios habilitados.
 * responses:
 * 200:
 * description: Lista de usuarios obtenida exitosamente.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * type: object
 * properties:
 * id:
 * type: string
 * description: ID del usuario.
 * fullName:
 * type: string
 * description: Nombre completo del usuario.
 * username:
 * type: string
 * description: Nombre de usuario.
 * email:
 * type: string
 * format: email
 * description: Correo electrónico del usuario.
 * roles:
 * type: array
 * items:
 * type: string
 * description: Roles asignados al usuario.
 * isEnabled:
 * type: boolean
 * description: Indica si el usuario está habilitado.
 * 500:
 * description: Error interno del servidor.
 */
router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 * get:
 * summary: Obtener un usuario por su ID.
 * parameters:
 * - in: path
 * name: id
 * required: true
 * description: ID del usuario a obtener.
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Usuario obtenido exitosamente.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * id:
 * type: string
 * description: ID del usuario.
 * fullName:
 * type: string
 * description: Nombre completo del usuario.
 * username:
 * type: string
 * description: Nombre de usuario.
 * email:
 * type: string
 * format: email
 * description: Correo electrónico del usuario.
 * roles:
 * type: array
 * items:
 * type: string
 * description: Roles asignados al usuario.
 * permissions:
 * type: object
 * description: Permisos manuales del usuario.
 * isEnabled:
 * type: boolean
 * description: Indica si el usuario está habilitado.
 * 404:
 * description: Usuario no encontrado.
 * 500:
 * description: Error interno del servidor.
 */
router.get('/:id', userController.getUserById);

/**
 * @swagger
 * /users/{id}:
 * put:
 * summary: Editar la información de un usuario.
 * parameters:
 * - in: path
 * name: id
 * required: true
 * description: ID del usuario a editar.
 * schema:
 * type: string
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * fullName:
 * type: string
 * description: Nuevo nombre completo del usuario.
 * email:
 * type: string
 * format: email
 * description: Nuevo correo electrónico del usuario.
 * password:
 * type: string
 * description: Nueva contraseña del usuario (opcional).
 * roles:
 * type: array
 * items:
 * type: string
 * description: Nuevos roles asignados al usuario.
 * permissions:
 * type: object
 * description: Permisos manuales actualizados del usuario.
 * responses:
 * 200:
 * description: Información del usuario actualizada exitosamente.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * id:
 * type: string
 * description: ID del usuario actualizado.
 * message:
 * type: string
 * description: Mensaje de éxito.
 * 400:
 * description: Error en los datos de entrada.
 * 404:
 * description: Usuario no encontrado.
 * 500:
 * description: Error interno del servidor.
 */
router.put('/:id', userController.updateUser);

/**
 * @swagger
 * /users/{id}/disable:
 * patch:
 * summary: Deshabilitar un usuario por su ID.
 * parameters:
 * - in: path
 * name: id
 * required: true
 * description: ID del usuario a deshabilitar.
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Usuario deshabilitado exitosamente.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * id:
 * type: string
 * description: ID del usuario deshabilitado.
 * message:
 * type: string
 * description: Mensaje de éxito.
 * 404:
 * description: Usuario no encontrado.
 * 500:
 * description: Error interno del servidor.
 */
router.patch('/:id/disable', userController.disableUser);

export default router;