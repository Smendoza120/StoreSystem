import { useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
  storageLocation: string;
  stockStatus: "good" | "low" | "out of stock";
}

interface InventoryResponse {
  data: Product[];
  total: number;
}

const useInventory = (page: number = 1, limit: number = 10) => {
  const [inventoryData, setInventoryData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      setError(null);
      try {
        // Reemplaza 'http://localhost:3000/api/inventory' con la URL real de tu API
        const response = await fetch(
          `http://localhost:3000/api/inventory?page=${page}&limit=${limit}`
        );
        if (!response.ok) {
          const message = `HTTP error! status: ${response.status}`;
          throw new Error(message);
        }
        const data: InventoryResponse = await response.json();
        setInventoryData(data.data);
        setTotalItems(data.total || 0); // Si la API devuelve el total
      } catch (err: Error | any) {
        setError(err.message || "Error fetching inventory");
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [page, limit]);

  return { inventoryData, loading, error, totalItems };
};

export default useInventory;
