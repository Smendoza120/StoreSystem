export interface SaleItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface SalePayload {
  products: {
    productId: string;
    quantity: number;
  }[];
}

export interface SaleHistoryProduct {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
  storageLocation?: string;
  stockStatus?: string;
}

export interface SaleHistoryEntry {
  _id: string;
  saleId: string;
  date: string;
  products: SaleHistoryProduct[];
  totalAmount: number;
}

export interface MakeSaleResponse {
  message: string;
  saleId: string;
}

export interface InventoryProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
}
