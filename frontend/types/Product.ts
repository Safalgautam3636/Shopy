export interface Product {
  imgUrl: string;
  name: string; //title
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
