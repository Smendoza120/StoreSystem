import { apiClient, type ApiResponse } from "../utils/apiClient";
import type {
  SaleProductInput,
  SaleRecord,
  RecordSaleResponseData,
} from "../interfaces/sales";


const SALES_ENDPOINT = "/sales"; 
const SALES_HISTORY_ENDPOINT = "/sales-history"; 

/**
 * Registra una nueva venta en la API.
 * @param products Los productos a vender, con su ID y cantidad.
 * @param token Token de autenticación (opcional).
 * @returns Una promesa que resuelve con la respuesta de la API que contiene los detalles de la venta registrada.
 * @throws Error si la solicitud falla o la API devuelve un error.
 */
export const recordSale = async (
  products: SaleProductInput[],
  token?: string 
): Promise<ApiResponse<RecordSaleResponseData>> => {
  try {
    const response = await apiClient<RecordSaleResponseData>(SALES_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({ products }),
      token: token, 
    });
    return response;
  } catch (error: unknown) {
    console.error("Error en salesService.ts -> recordSale:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Ocurrió un error desconocido al registrar la venta.");
  }
};

/**
 * Obtiene el historial completo de ventas de la API.
 * @param token Token de autenticación (opcional).
 * @returns Una promesa que resuelve con la respuesta de la API que contiene un array de `SaleRecord`.
 * @throws Error si la solicitud falla o la API devuelve un error.
 */
export const getSalesHistory = async (
  token?: string 
): Promise<ApiResponse<SaleRecord[]>> => {
  try {
    const response = await apiClient<SaleRecord[]>(SALES_HISTORY_ENDPOINT, {
      method: "GET",
      token: token, 
    });
    return response;
  } catch (error: unknown) {
    console.error("Error en salesService.ts -> getSalesHistory:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(
      "Ocurrió un error desconocido al obtener el historial de ventas."
    );
  }
};

/**
 * Descarga la factura en PDF para una venta específica.
 * @param saleId El ID de la venta.
 * @param token Token de autenticación (opcional).
 * @returns Una promesa que resuelve cuando la descarga ha sido iniciada.
 * @throws Error si la solicitud falla.
 */
export const downloadInvoice = async (
  saleId: string,
  token?: string // Hacemos el token opcional con '?'
): Promise<void> => {
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
  const url = `${API_BASE_URL}/sales/invoice/${saleId}`; 

  const headers: HeadersInit = {
    Accept: "application/pdf",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`; 
  }

  try {
    const response = await fetch(url, { headers });

    if (!response.ok) {
      let errorMessage = `Error ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // Si no es JSON, simplemente usamos el mensaje HTTP
      }
      throw new Error(errorMessage);
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", `factura_${saleId}.pdf`); 
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl); 
  } catch (error: unknown) {
    console.error("Error en salesService.ts -> downloadInvoice:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(
      "Ocurrió un error desconocido al intentar descargar la factura."
    );
  }
};


