import { users, generateUserId, generateUsername } from "../data/mockData.mjs";

/**
 * @function createUser
 * @description Crea un nuevo usuario en el sistema.
 * Valida los campos requeridos, verifica si el email ya existe y asigna permisos basados en los roles.
 * @param {object} req - El objeto de solicitud de Express, esperando `fullName`, `email`, `password`, `roles` (opcional) en `req.body`.
 * @param {object} res - El objeto de respuesta de Express.
 * @returns {object} 201 - Si el usuario se crea exitosamente.
 * @returns {Error} 400 - Si faltan campos requeridos.
 * @returns {Error} 409 - Si el correo electrónico ya está registrado.
 */
export const createUser = (req, res) => {
  const { fullName, email, password, roles = [] } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({
      success: false,
      message:
        "Todos los campos requeridos (fullName, email, password) deben ser proporcionados.",
    });
  }

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "El correo electrónico ya está registrado.",
    });
  }

  const id = generateUserId();
  const username = generateUsername(fullName);
  const newUser = {
    id,
    fullName,
    username,
    email,
    password,
    roles,
    isEnabled: true,
    permissions: {},
  };

  if (roles.includes("admin") || roles.includes("developer")) {
    newUser.permissions = {
      control_usuarios: { read: true, write: true, delete: true },
      inventario: { read: true, write: true, delete: true },
      ventas_diarias: { read: true, write: true, delete: true },
    };
  } else if (roles.includes("employee")) {
    newUser.permissions = {
      control_usuarios: { read: false, write: false, delete: false },
      inventario: { read: false, write: false, delete: false },
      ventas_diarias: { read: true, write: true, delete: false },
    };
  } else {
    console.warn(
      `Rol(es) desconocido(s) asignado(s) a ${newUser.username}: ${roles}. Asignando permisos vacíos.`
    );
    newUser.permissions = {};
  }

  users.push(newUser);

  return res.status(201).json({
    success: true,
    message: `Usuario "${newUser.username}" creado exitosamente.`,
    data: { id: newUser.id, username: newUser.username },
  });
};

/**
 * @function getAllUsers
 * @description Recupera una lista de TODOS los usuarios en el sistema (habilitados y deshabilitados).
 * @param {object} req - El objeto de solicitud de Express.
 * @param {object} res - El objeto de respuesta de Express.
 * @returns {object} 200 - Un objeto con `success`, `message` y un array de todos los usuarios en `data`.
 */
export const getAllUsers = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Todos los usuarios recuperados exitosamente.",
    data: users, // Devuelve todos los usuarios sin filtrar
  });
};

/**
 * @function getEnabledUsers
 * @description Recupera una lista de solo los usuarios habilitados en el sistema.
 * @param {object} req - El objeto de solicitud de Express.
 * @param {object} res - El objeto de respuesta de Express.
 * @returns {object} 200 - Un objeto con `success`, `message` y un array de usuarios habilitados en `data`.
 */
export const getEnabledUsers = (req, res) => {
  const enabledUsers = users.filter((user) => user.isEnabled);
  return res.status(200).json({
    success: true,
    message: "Usuarios habilitados recuperados exitosamente.",
    data: enabledUsers,
  });
};

/**
 * @function getUserById
 * @description Recupera la información de un usuario específico por su ID.
 * Solo devuelve usuarios que estén habilitados.
 * @param {object} req - El objeto de solicitud de Express, esperando `id` como parámetro de ruta.
 * @param {object} res - El objeto de respuesta de Express.
 * @returns {object} 200 - Si el usuario es encontrado y está habilitado.
 * @returns {Error} 404 - Si el usuario no es encontrado o está deshabilitado.
 */
export const getUserById = (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id && user.isEnabled);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Usuario no encontrado o deshabilitado.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Usuario encontrado.",
    data: user,
  });
};

/**
 * @function updateUser
 * @description Actualiza la información de un usuario existente por su ID.
 * Permite actualizar `fullName`, `email`, `password`, `roles` y `permissions`.
 * @param {object} req - El objeto de solicitud de Express, esperando `id` como parámetro de ruta y los campos a actualizar en `req.body`.
 * @param {object} res - El objeto de respuesta de Express.
 * @returns {object} 200 - Si la información del usuario se actualiza exitosamente.
 * @returns {Error} 404 - Si el usuario no es encontrado o está deshabilitado.
 * @returns {Error} 409 - Si el nuevo correo electrónico ya está en uso por otro usuario.
 */
export const updateUser = (req, res) => {
  const { id } = req.params;
  const { fullName, email, password, roles, permissions } = req.body;
  const userIndex = users.findIndex((user) => user.id === id && user.isEnabled);

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Usuario no encontrado o deshabilitado.",
    });
  }

  if (email !== undefined && email !== users[userIndex].email) {
    const emailExists = users.some((u) => u.email === email && u.id !== id);
    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: "El nuevo correo electrónico ya está en uso por otro usuario.",
      });
    }
  }

  const updatedUser = {
    ...users[userIndex],
    ...(fullName !== undefined && { fullName }),
    ...(email !== undefined && { email }),
    ...(password !== undefined && { password }),
    ...(roles !== undefined && { roles }),
    ...(permissions !== undefined && { permissions }),
  };

  users[userIndex] = updatedUser;

  return res.status(200).json({
    success: true,
    message: "Información del usuario actualizada exitosamente.",
    data: { id: updatedUser.id, username: updatedUser.username },
  });
};

/**
 * @function disableUser
 * @description Deshabilita un usuario existente en el sistema por su ID.
 * Establece la propiedad `isEnabled` del usuario a `false`.
 * @param {object} req - El objeto de solicitud de Express, esperando `id` como parámetro de ruta.
 * @param {object} res - El objeto de respuesta de Express.
 * @returns {object} 200 - Si el usuario se deshabilita exitosamente.
 * @returns {Error} 404 - Si el usuario no es encontrado o ya está deshabilitado.
 */
export const disableUser = (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((user) => user.id === id && user.isEnabled);

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Usuario no encontrado o ya está deshabilitado.",
    });
  }

  users[userIndex].isEnabled = false;

  return res.status(200).json({
    success: true,
    message: `Usuario con ID "${id}" deshabilitado exitosamente.`,
  });
};

/**
 * @function loginUser
 * @description Autentica a un usuario.
 * Verifica las credenciales (email/username y contraseña) y si el usuario está habilitado.
 * @param {object} req - El objeto de solicitud de Express, esperando `identifier` (email o username) y `password` en `req.body`.
 * @param {object} res - El objeto de respuesta de Express.
 * @returns {object} 200 - Si el inicio de sesión es exitoso, con un token (simulado).
 * @returns {Error} 400 - Si faltan credenciales.
 * @returns {Error} 401 - Si las credenciales son inválidas o el usuario está deshabilitado.
 */
export const loginUser = (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({
      success: false,
      message:
        "Se deben proporcionar el correo electrónico/usuario y la contraseña.",
    });
  }

  const user = users.find((u) => {
    return (
      (u.email === identifier || u.username === identifier) &&
      u.password === password &&
      u.isEnabled
    );
  });

  if (user) {
    const token = generateUserId();
    return res
      .status(200)
      .json({ success: true, message: "Inicio de sesión exitoso", token });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Credenciales inválidas." });
  }
};
