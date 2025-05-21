import type { Product } from "../interfaces/inventory";
import type { GetInventoryProductResponse } from "./salesService";

const API_URL = "http://localhost:3000/api/inventory";

export const createProduct = async (
  newProduct: Omit<Product, "id">
): Promise<Product> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al crear el producto");
  }

  return await response.json();
};

export const updateProduct = async (
  updatedProduct: Product
): Promise<Product> => {
  const response = await fetch(`${API_URL}/${updatedProduct.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProduct),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al actualizar el producto");
  }

  return await response.json();
};

/**
 * Obtiene todos los productos del inventario desde la API.
 * La API: GET /api/inventory
 * @returns {Promise<GetInventoryProductResponse[]>} Una promesa que resuelve con un array de productos.
 */
export const getAllInventoryProducts = async (): Promise<
  GetInventoryProductResponse[]
> => {
  try {
    const response = await fetch(`${API_URL}`); // Ajusta esta URL si tu ruta es diferente
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Error al cargar productos del inventario."
      );
    }
    const data: GetInventoryProductResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Error en salesService.ts -> getAllInventoryProducts:",
      error
    );
    throw error;
  }
};

/**
 * Busca productos en el inventario por nombre.
 * La API: GET /api/inventory/search?name={searchTerm}
 * @param {string} searchTerm El término de búsqueda para el nombre del producto.
 * @returns {Promise<GetInventoryProductResponse[]>} Una promesa que resuelve con un array de productos que coinciden.
 */
export const searchProductsByName = async (
  searchTerm: string
): Promise<GetInventoryProductResponse[]> => {
  try {
    // Codificamos el término de búsqueda para URLs
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const response = await fetch(`${API_URL}/search?name=${encodedSearchTerm}`); // Nueva API

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message ||
          `Error al buscar productos con el término "${searchTerm}".`
      );
    }

    const data: GetInventoryProductResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Error en inventoryService.ts -> searchProductsByName:",
      error
    );
    throw error;
  }
};
