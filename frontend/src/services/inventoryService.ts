import type { Product } from "../interfaces/inventory";

const API_BASE_URL = "http://localhost:3000/api/inventory";

export const createProduct = async (
  newProduct: Omit<Product, "id">
): Promise<Product> => {
  const response = await fetch(API_BASE_URL, {
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
  const response = await fetch(`${API_BASE_URL}/${updatedProduct.id}`, {
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
