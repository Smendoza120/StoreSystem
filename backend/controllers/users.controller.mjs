import { v4 as uuidv4 } from "uuid";

let users = [];

const generateUsername = (fullName) => {
  const [firstName, ...lastNameParts] = fullName
    .toLowerCase()
    .replace(/\s/g, "")
    .split(" ");
  const lastName = lastNameParts.join("");
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  let username = `${firstName}${lastName}${randomNumber}`;

  while (users.some((user) => user.username === username)) {
    const newRandomNumber = Math.floor(Math.random() * 100) + 1;
    username = `${firstName}${lastName}${newRandomNumber}`;
  }

  return username;
};

export const createUser = (req, res) => {
  const { fullName, email, password, roles = [] } = req.body;

  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json({
        message: "Todos los campos requeridos deben ser proporcionados.",
      });
  }

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res
      .status(409)
      .json({ message: "El correo electrónico ya está registrado." });
  }

  const id = uuidv4();
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

  if (roles.includes('admin') || roles.includes('developer')) {
    newUser.permissions = {
      'control_usuarios': { read: true, write: true, delete: true },
      'inventario': { read: true, write: true, delete: true },
      'ventas_diarias': { read: true, write: true, delete: true },
    };
  } else if (roles.includes('employee')) {
    newUser.permissions = {
      'control_usuarios': { read: false, write: false, delete: false },
      'inventario': { read: false, write: false, delete: false },
      'ventas_diarias': { read: true, write: true, delete: false },
    };
  } else {
    console.warn(`Rol(es) desconocido(s) asignados a ${newUser.username}: ${roles}`);
    newUser.permissions = {};
  }

  users.push(newUser);

  return res.status(201).json({ id: newUser.id, username: newUser.username });
};

export const getAllUsers = (req, res) => {
  const enabledUsers = users.filter((user) => user.isEnabled);
  return res.status(200).json(enabledUsers);
};

export const getUserById = (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id && user.isEnabled);

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado." });
  }

  return res.status(200).json(user);
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { fullName, email, password, roles, permissions } = req.body;
  const userIndex = users.findIndex((user) => user.id === id && user.isEnabled);

  if (userIndex === -1) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  const updatedUser = {
    ...users[userIndex],
    fullName,
    email,
    roles,
    permissions,
  };
  if (password) {
    updatedUser.password = password;
  }

  users[userIndex] = updatedUser;

  return res
    .status(200)
    .json({
      id: updatedUser.id,
      message: "Información del usuario actualizada exitosamente.",
    });
};

export const disableUser = (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((user) => user.id === id && user.isEnabled);

  if (userIndex === -1) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  users[userIndex].isEnabled = false;
  return res
    .status(200)
    .json({ id, message: "Usuario deshabilitado exitosamente." });
};

export const loginUser = (req, res) => {
    const {identifier, password} = req.body;

    if(!identifier || !password){
        return res.status(400).json({ message: "Se deben proporcionar el correo electrónico/usuario y la contraseña." });
    }

    const user = users.find(
        (u) => {
            (u.email === identifier || u.username === identifier) &&
            u.password ===password &&
            u.isEnabled
        }
    );

    if(user){
        const token = uuidv4();
        return res.status(200).json({ message: "Inicio de sesión exitoso", token });
    } else {
        return res.status(401).json({ message: "Credenciales inválidas." });
    }
}
