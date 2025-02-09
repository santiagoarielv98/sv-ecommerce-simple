export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}

export interface CartState {
  items: CartItem[];
  error: string | null;
  isLoading: boolean;
}
