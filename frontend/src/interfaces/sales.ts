/**
 * @interface SaleProductInput
 * @description Representa la estructura de un producto cuando se envía para registrar una venta.
 */
export interface SaleProductInput {
  productId: string;
  quantity: number;
}

/**
 * @interface SoldProductDetail
 * @description Representa la estructura de un producto tal como se registra en una venta histórica.
 */
export interface SoldProductDetail {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

/**
 * @interface SaleRecord
 * @description Representa la estructura completa de un registro de venta en el historial.
 */
export interface SaleRecord {
  id: string;
  date: string; // ISO string de la fecha
  products: SoldProductDetail[];
  totalSaleAmount: number;
}

/**
 * @interface RecordSaleResponseData
 * @description Representa la estructura de los datos devueltos al registrar una venta exitosamente.
 */
export interface RecordSaleResponseData {
  sale: SaleRecord;
}

/**
 * @interface PaginatedSalesData
 * @description Representa la estructura de la respuesta para un historial de ventas paginado (si tu API lo implementa así, de lo contrario, solo un array de SaleRecord).
 * Nota: Tu backend actual devuelve un array simple, no paginado. Esta es una interfaz opcional para futuro.
 */
export interface PaginatedSalesData {
  sales: SaleRecord[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

/**
 * @interface InventoryProduct
 * @description Representa la estructura de un producto de inventario que se muestra en la búsqueda.
 * Ajusta los campos según la respuesta real de tu API de inventario.
 */
export interface InventoryProduct {
  id: string;
  name: string;
  description: string;
  price: number; // Suponemos que es 'price' para el frontend
  category: string;
  stock: number; // Cantidad disponible en inventario
  imageUrl?: string;
  unitPrice: number; // Agregado para que coincida con el uso en SaleItem si es diferente de 'price'
}

/**
 * @interface SaleItem
 * @description Representa un producto que ha sido agregado a la lista de venta en el frontend.
 * Combina información de `InventoryProduct` con la cantidad y el precio total calculado.
 */
export interface SaleItem {
  id: string; // productId
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number; // quantity * unitPrice
}

/**
 * @interface SalePayload
 * @description Representa la estructura del cuerpo de la solicitud para registrar una venta.
 * Coincide con lo que el backend espera para `recordSale`.
 */
export interface SalePayload {
  products: {
    productId: string;
    quantity: number;
  }[];
}
