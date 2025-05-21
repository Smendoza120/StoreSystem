import { useState, useEffect, useCallback } from "react";
import type { Product, ProductApiResponse } from "../interfaces/inventory";
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
      const response = await apiClient<ProductApiResponse>(
        `/inventory?page=${page}&limit=${limit}`,
        token ? { token } : {}
      );

      console.log("Respuesta COMPLETA de la API en useInventory:", response);
      console.log("Contenido de response.data:", response.data);
      console.log("Tipo de response.data:", typeof response.data);
      console.log("¿Es response.data un array?", Array.isArray(response.data));

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
    // COMENTADO: Eliminamos la lógica de verificación del token
    // if (token) {
    fetchInventory();
    // } else {
    //   setLoading(false);
    //   if (inventoryData.length === 0 && !error) {
    //     setError("Token de autenticación no disponible.");
    //   }
    // }
  }, [fetchInventory]); // 'token' ya no es una dependencia para que no re-ejecute al cambiar
  // Si refetchInventory depende de token, entonces quizás sí deba ir.
  // Mejor: 'fetchInventory' ya tiene 'token' en sus dependencias de useCallback.
  // Por lo tanto, 'useEffect' solo necesita 'fetchInventory'.

  // const refetch = useCallback(() => {
  //   fetchInventory();
  // }, [fetchInventory]);

  const refetch = useCallback(() => {
    fetchInventory();
  }, [fetchInventory]);

  return { inventoryData, loading, error, totalItems, refetch };
};

export default useInventory;
