import type { LoginCredentials, LoginResponse } from "../interfaces/login";

const API_URL = "http://localhost:3000/api/auth";

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error al iniciar sesión: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error al llamar a la API de login:", error);
    throw error;
  }
};