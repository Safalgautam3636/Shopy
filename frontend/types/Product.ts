export interface Product {
  _id?: number;
  imgUrl: string;
  name: string;
  price: number;
  stockQuantity: number;
  category: string;
  brand?: string;
  ratings: number;
  reviews: number;
}

export interface ProductResponse {
  product: Product;
  message: string;
  valid?: boolean;
}

export interface ProductsResponse {
  allProducts: Product[];
}
