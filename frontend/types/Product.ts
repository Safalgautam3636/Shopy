export interface Product {
  _id?: number;
  imgUrl: string;
  name: string;
  description?: string;
  price: number;
  stockQuantity: number;
  category: string;
  brand?: string;
  ratings: number;
  reviews: number;
}

export interface ProductResponse {
  product: Product;
}

export interface ProductsResponse {
  allProducts: Product[];
}
