import type { UserData, UserDataTable } from "../interfaces/user";
import { apiClient, type ApiResponse } from "../utils/apiClient";

const USER_ENDPOINT = "/users";

/**
 * Crea un nuevo usuario en la API.
 * @param userData Los datos del nuevo usuario.
 * @param token Token de autenticación para la API (cadena vacía por ahora).
 * @returns Una promesa que resuelve con la respuesta de la API.
 * @throws Error si la solicitud falla.
 */
export const createUser = async (
  userData: UserData,
  token: string = "" // Valor por defecto para el token
): Promise<ApiResponse<{ id: string; username: string }>> => {
  // El backend devuelve { success: true, message: "...", data: { id, username } }
  try {
    const response = await apiClient<{ id: string; username: string }>(
      USER_ENDPOINT,
      {
        method: "POST",
        body: JSON.stringify(userData),
        token: token,
      }
    );
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    // Si no es una instancia de Error, lanzamos un nuevo Error genérico
    throw new Error("Ocurrió un error desconocido al crear el usuario.");
  }
};

/**
 * Obtiene todos los usuarios de la API.
 * @param token Token de autenticación para la API (cadena vacía por ahora).
 * @returns Una promesa que resuelve con la respuesta de la API que contiene un array de `UserDataTable`.
 * @throws Error si la solicitud falla.
 */
export const getAllUsers = async (
  token: string = "" // Valor por defecto para el token
): Promise<ApiResponse<UserDataTable[]>> => {
  // El backend devuelve { success: true, message: "...", data: UserDataTable[] }
  try {
    const response = await apiClient<UserDataTable[]>(`${USER_ENDPOINT}`, {
      method: "GET",
      token: token,
    });
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Ocurrió un error desconocido al obtener los usuarios.");
  }
};

/**
 * Deshabilita un usuario dado su ID.
 * @param userId El ID del usuario a deshabilitar.
 * @param token Token de autenticación para la API (cadena vacía por ahora).
 * @returns Una promesa que resuelve con la respuesta de la API.
 * @throws Error si la solicitud a la API falla o no es exitosa.
 */
export const disableUser = async (
  userId: string,
  token: string = "" // Valor por defecto para el token
): Promise<ApiResponse<null>> => {
  // El backend devuelve { success: true, message: "..." }
  if (!userId) {
    throw new Error("El ID del usuario es requerido para deshabilitar.");
  }

  try {
    const response = await apiClient<null>(
      `${USER_ENDPOINT}/${userId}/disable`, // Asegúrate que esta ruta coincide con tu backend
      {
        method: "PUT",
        token: token,
      }
    );
    return response;
  } catch (error) {
    console.error("Error en userService.ts -> disableUser:", error);
    throw error;
  }
};

/**
 * Habilita un usuario dado su ID.
 * @param userId El ID del usuario a habilitar.
 * @param token Token de autenticación para la API (cadena vacía por ahora).
 * @returns Una promesa que resuelve con la respuesta de la API.
 * @throws Error si la solicitud a la API falla o no es exitosa.
 */
export const enableUser = async (
  userId: string,
  token: string = "" // Valor por defecto para el token
): Promise<ApiResponse<null>> => {
  // El backend devuelve { success: true, message: "..." }
  if (!userId) {
    throw new Error("El ID del usuario es requerido para habilitar.");
  }

  try {
    const response = await apiClient<null>(
      `${USER_ENDPOINT}/${userId}/enable`, // Asume que tienes un endpoint similar para habilitar
      {
        method: "PUT",
        token: token,
      }
    );
    return response;
  } catch (error) {
    console.error("Error en userService.ts -> enableUser:", error);
    throw error;
  }
};
