import type {
  Product,
  ProductApiResponse,
  ProductSingleResponse,
} from "../interfaces/inventory";
import { apiClient } from "../utils/apiClient";

/**
 * @function createProduct
 * @description Crea un nuevo producto en el inventario.
 * @param {Omit<Product, "id">} newProduct - Los datos del nuevo producto sin el ID.
 * @param {string} token - El token de autenticación del usuario.
 * @returns {Promise<ProductSingleResponse>} Una promesa que resuelve con la respuesta de la API.
 * @throws {Error} Lanza un error si la solicitud falla.
 */
export const createProduct = async (
  newProduct: Omit<Product, "id">,
  token?: string
): Promise<ProductSingleResponse> => {
  return apiClient<ProductSingleResponse>("/inventory", {
    method: "POST",
    body: JSON.stringify(newProduct),
    token: token || undefined,
  });
};

/**
 * @function updateProduct
 * @description Actualiza un producto existente en el inventario.
 * @param {Product} updatedProduct - Los datos del producto a actualizar (debe incluir el ID).
 * @param {string} token - El token de autenticación del usuario.
 * @returns {Promise<ProductSingleResponse>} Una promesa que resuelve con la respuesta de la API.
 * @throws {Error} Lanza un error si la solicitud falla.
 */
export const updateProduct = async (
  updatedProduct: Product,
  token: string
): Promise<ProductSingleResponse> => {
  return apiClient<ProductSingleResponse>(`/inventory/${updatedProduct.id}`, {
    method: "PUT",
    body: JSON.stringify(updatedProduct),
    token: token || undefined,
  });
};

/**
 * @function getAllInventoryProducts
 * @description Obtiene todos los productos del inventario desde la API.
 * @param {string} token - El token de autenticación del usuario.
 * @returns {Promise<ProductApiResponse>} Una promesa que resuelve con la respuesta de la API.
 * @throws {Error} Lanza un error si la solicitud falla.
 */
export const getAllInventoryProducts = async (
  token: string
): Promise<ProductApiResponse> => {
  return apiClient<ProductApiResponse>("/inventory", { token });
};

/**
 * @function searchProductsByName
 * @description Busca productos en el inventario por nombre.
 * @param {string} searchTerm - El término de búsqueda para el nombre del producto.
 * @param {string} token - El token de autenticación del usuario.
 * @returns {Promise<ProductApiResponse>} Una promesa que resuelve con la respuesta de la API.
 * @throws {Error} Lanza un error si la solicitud falla.
 */
export const searchProductsByName = async (
  searchTerm: string,
  token: string
): Promise<ProductApiResponse> => {
  const encodedSearchTerm = encodeURIComponent(searchTerm);
  return apiClient<ProductApiResponse>(
    `/inventory/search?name=${encodedSearchTerm}`,
    { token }
  );
};
