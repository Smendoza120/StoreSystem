export interface Product {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
  storageLocation: string;
  stockStatus: "good" | "low" | "out of stock" | "bien" | "bajo" | "agotado";
}