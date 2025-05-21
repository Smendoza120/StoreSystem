interface RequestOptions extends RequestInit {
  token?: string;
}

/**
 * @interface ApiResponseError
 * @description Interfaz para la estructura de error esperada de las respuestas de la API.
 */
interface ApiResponseError {
  success: false;
  message: string;
  errors?: string[]; // Propiedad opcional para un array de errores detallados
}

/**
 * @function apiClient
 * @description Función genérica para realizar llamadas a la API usando `Workspace`.
 * Centraliza la configuración de la URL base, encabezados y manejo de errores.
 * @param {string} endpoint - La ruta específica de la API (ej. '/auth/login', '/users').
 * @param {RequestOptions} [options] - Opciones de la solicitud `Workspace` (método, body, headers, etc.).
 * @returns {Promise<T>} Una promesa que resuelve con los datos parseados de la respuesta JSON.
 * @throws {Error} Lanza un error si la respuesta de la red no es exitosa (status >= 400).
 */
export async function apiClient<T>(
  endpoint: string,
  options?: RequestOptions
): Promise<T> {
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (options?.headers) {
    if (options.headers instanceof Headers) {
      options.headers.forEach((value, key) => {
        headers[key] = value;
      });
    } else if (Array.isArray(options.headers)) {
      options.headers.forEach(([key, value]) => {
        headers[key] = value;
      });
    } else {
      Object.assign(headers, options.headers);
    }
  }

  if (options?.token) {
    headers["Authorization"] = `Bearer ${options.token}`;
  }

  const config: RequestInit = {
    method: options?.method || "GET",
    headers: headers,
    body: options?.body,
  };

  if (["GET", "HEAD"].includes(config.method as string) || !config.body) {
    delete config.body;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    let errorContent: ApiResponseError | string | null = null;
    try {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        errorContent = await response.json();
      } else {
        errorContent = await response.text();
      }
    } catch (parseError) {
      console.error("Error al parsear la respuesta de error:", parseError);
      errorContent = `Error ${response.status}: ${response.statusText}`;
    }

    if (
      errorContent &&
      typeof errorContent === "object" &&
      errorContent.message
    ) {
      throw new Error(errorContent.message);
    } else if (typeof errorContent === "string") {
      throw new Error(errorContent);
    } else {
      throw new Error(
        `Error en la solicitud: ${response.status} ${response.statusText}`
      );
    }
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json() as Promise<T>;
}
