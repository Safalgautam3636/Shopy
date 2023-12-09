export interface Order {
  userId: number;
  orderDate: Date;
  totalAmount: number;
  items: OrderItem[];
  orderStatus: string;
}
export interface OrderItem {
  productId: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface OrderResponse {
  order: Order;
}

export interface OrdersResponse {
  allOrders: Order[];
}
