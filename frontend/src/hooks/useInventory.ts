import { useState, useEffect, useCallback } from "react";
import type { PaginatedProductsData, Product } from "../interfaces/inventory";
import { apiClient } from "../utils/apiClient";

const useInventory = (page: number = 1, limit: number = 10, token: string) => {
  const [inventoryData, setInventoryData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState<number>(0);

  const fetchInventory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient<PaginatedProductsData>(
        `/inventory?page=${page}&limit=${limit}`,
        token ? { token } : {}
      );

      if (response.success) {
        setInventoryData(response.data.products);
        setTotalItems(response.data.totalItems);
      } else {
        setError(response.message || "Error al cargar el inventario.");
      }
    } catch (err: unknown) {
      console.error("Error al obtener el inventario:", err);
      if (err instanceof Error) {
        setError(err.message || "Error de conexión al obtener el inventario.");
      } else if (typeof err === "string") {
        setError(err);
      } else {
        setError("Ocurrió un error inesperado al obtener el inventario.");
      }
    } finally {
      setLoading(false);
    }
  }, [page, limit, token]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const refetch = useCallback(() => {
    fetchInventory();
  }, [fetchInventory]);

  return { inventoryData, loading, error, totalItems, refetch };
};

export default useInventory;
