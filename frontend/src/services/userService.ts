import type { UserData, UserDataTable } from "../interfaces/user";

const API_URL = "http://localhost:3000/api/users";

export const createUser = async (userData: UserData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al crear el usuario");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error al llamar a la API para crear usuario:", error);
    throw error;
  }
};

export const getAllUsers = async (): Promise<UserDataTable[]> => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Error al obtener usuarios: ${response.status}`
      );
    }
    return await response.json();
  } catch (error: any) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

interface DisableUserResponse {
  message: string;
  // Puedes añadir más campos si tu API los devuelve, por ejemplo:
  // userId: string;
  // status: boolean;
}

/**
 * Deshabilita un usuario dado su ID.
 * @param userId El ID del usuario a deshabilitar.
 * @returns Una promesa que resuelve con la respuesta de la API.
 * @throws Error si la solicitud a la API falla o no es exitosa.
 */
export const disableUser = async (userId: string): Promise<DisableUserResponse> => {
  if (!userId) {
    throw new Error('El ID del usuario es requerido para deshabilitar.');
  }

  const API_BASE_URL = 'https://your-api-base-url';

  try {
    const response = await fetch(`${API_BASE_URL}/${userId}/disable`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response);
    console.log(userId);

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || 'Error desconocido al deshabilitar el usuario.';
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    const data: DisableUserResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error en userService.ts -> disableUser:', error);
    throw error; 
  }
};