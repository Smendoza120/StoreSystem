import { useState, useEffect, useCallback } from "react";
import type { Product } from "../interfaces/inventory";

interface InventoryResponse {
  products: Product[]; 
  totalItems: number; 
}

const useInventory = (page: number = 1, limit: number = 10) => {
  const [inventoryData, setInventoryData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState<number>(0);

  const fetchInventory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3000/api/inventory?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        const message = `HTTP error! status: ${response.status}`;
        throw new Error(message);
      }
      const data: InventoryResponse = await response.json(); // Espera la nueva estructura de la respuesta
      console.log("Datos recibidos de la API:", data);
      setInventoryData(data.products); // Accede al array de productos desde la propiedad 'products'
      setTotalItems(data.totalItems); // Accede al total de items desde la propiedad 'totalItems'
    } catch (err: Error | any) {
      console.error("Error al obtener el inventario:", err);
      setError(err.message || "Error fetching inventory");
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const refetch = useCallback(() => {
    fetchInventory();
  }, [fetchInventory]);

  return { inventoryData, loading, error, totalItems, refetch };
};

export default useInventory;
