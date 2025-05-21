import type {
  SalePayload,
  MakeSaleResponse,
  SaleHistoryEntry,
} from "../interfaces/sales";

const API_URL = "http://localhost:3000/api";

/**
 * Envía una nueva venta al backend.
 * La API: POST /api/sales
 * @param {SalePayload['products']} productsData Los productos y cantidades a vender.
 * @returns {Promise<MakeSaleResponse>} Una promesa que resuelve con la respuesta de la API.
 */
export const makeSale = async (
  productsData: SalePayload["products"]
): Promise<MakeSaleResponse> => {
  try {
    const response = await fetch(`${API_URL}/sales`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products: productsData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al realizar la venta.");
    }
    const data: MakeSaleResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error en salesService.ts -> makeSale:", error);
    throw error;
  }
};

/**
 * Obtiene el historial de todas las ventas realizadas.
 * La API: GET /api/sales/history
 * @returns {Promise<SaleHistoryEntry[]>} Una promesa que resuelve con un array de objetos de venta.
 */
export const getSalesHistory = async (): Promise<SaleHistoryEntry[]> => {
  try {
    const response = await fetch(`${API_URL}/sales/history`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Error al obtener el historial de ventas."
      );
    }
    const data: SaleHistoryEntry[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error en salesService.ts -> getSalesHistory:", error);
    throw error;
  }
};

/**
 * Solicita la generación de un PDF de una factura de venta.
 * La API: GET /api/sales/{id}/invoice
 * @param {string} saleId El ID de la venta para la cual se generará la factura.
 * @returns {Promise<Blob>} Una promesa que resuelve con un Blob que representa el archivo PDF.
 */
export const getSaleInvoicePdf = async (saleId: string): Promise<Blob> => {
  try {
    const response = await fetch(`${API_URL}/sales/${saleId}/invoice`, {
      method: "GET",
      headers: {
        Accept: "application/pdf",
      },
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({
          message: "Error desconocido al generar la factura PDF.",
        }));
      throw new Error(errorData.message || "Error al generar la factura PDF.");
    }
    const pdfBlob = await response.blob();
    return pdfBlob;
  } catch (error) {
    console.error("Error en salesService.ts -> getSaleInvoicePdf:", error);
    throw error;
  }
};
