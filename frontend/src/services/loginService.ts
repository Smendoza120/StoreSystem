import type { LoginCredentials, LoginResponse } from "../interfaces/login";

// const API_URL = "http://localhost:3000/api/auth";
const API_URL = "https://store-system-nu.vercel.app/api/auth";

export const loginUser = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
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
      throw new Error(
        errorData.message || `Error al iniciar sesión: ${response.status}`
      );
    }

    return await response.json();
  } catch (error: unknown) {
    console.error("Error al llamar a la API de login:", error);
    let errorMessage = "Ocurrió un error inesperado al iniciar sesión.";
    
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as { message: unknown }).message === "string"
    ) {
      errorMessage = (error as { message: string }).message;
    }
    throw new Error(errorMessage);
  }
};
