/**
 * @interface Product
 * @description Interfaz que define la estructura completa de un producto en el inventario.
 * Esta interfaz refleja la estructura de los datos tal como son manejados en el frontend
 * y la mayoría de las veces como son recibidos/enviados al backend.
 */
export interface Product {
  id: string;
  name: string;
  unitPrice: number; // Precio unitario del producto
  quantity: number; // Cantidad en stock del producto
  storageLocation: string; // Ubicación de almacenamiento del producto
  stockStatus: "good" | "low" | "out of stock" | "bien" | "bajo" | "agotado"; // Estado del stock
  description?: string; // Propiedad opcional, si tu backend la envía
  category?: string; // Propiedad opcional, si tu backend la envía
}

/**
 * @interface PaginatedProductsData
 * @description Interfaz que define la estructura del objeto de datos paginados
 * que la API devuelve dentro de la propiedad 'data' de ProductApiResponse.
 */
export interface PaginatedProductsData {
  products: Product[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

/**
 * @interface ProductApiResponse
 * @description Interfaz para la respuesta estándar de la API cuando se listan múltiples productos.
 * Contiene un indicador de éxito, un mensaje y un objeto 'data' con el array de productos paginados.
 */
export interface ProductApiResponse {
  success: boolean;
  message: string;
  data: PaginatedProductsData; 
}

/**
 * @interface ProductSingleResponse
 * @description Interfaz para la respuesta estándar de la API cuando se obtiene, crea o actualiza un solo producto.
 * Contiene un indicador de éxito, un mensaje y un único objeto Product.
 */
export interface ProductSingleResponse {
  success: boolean;
  message: string;
  data: Product; 
}
