import {v4 as uuidv4} from "uuid";

//! USERS
export const users = []; // Array donde se almacenarán los objetos de usuario

/**
 * @function generateUsername
 * @description Genera un nombre de usuario único a partir del nombre completo, añadiendo un sufijo numérico para evitar duplicados.
 * @param {string} fullName - El nombre completo del usuario.
 * @returns {string} Un nombre de usuario único.
 */
export const generateUsername = (fullName) => {
  const cleanedFullName = fullName.toLowerCase().replace(/\s/g, "");
  const baseUsername = cleanedFullName;

  let username;
  let attempts = 0;
  const MAX_ATTEMPTS = 1000; // Límite para evitar bucles infinitos

  do {
    const randomNumber = Math.floor(Math.random() * 9000) + 1000; // Números de 4 dígitos
    username = `${baseUsername}${randomNumber}`;
    attempts++;
  } while (
    users.some((user) => user.username === username) &&
    attempts < MAX_ATTEMPTS
  );

  if (attempts >= MAX_ATTEMPTS) {
    console.warn(
      "Advertencia: No se pudo generar un nombre de usuario único después de muchos intentos."
    );
  }

  return username;
};

/**
 * @function generateUserId
 * @description Genera un ID único universal (UUID v4) para un usuario.
 * @returns {string} Un UUID v4 único.
 */
export const generateUserId = () => {
  return uuidv4();
};

//! INVENTORY
export let inventory = [];
export let salesHistory = [];

export const generateProductId = () => {
  return Math.random().toString(36).substring(2, 15);
};
