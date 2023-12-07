export interface Product {
  _id?: string;
  imgUrl: string;
  name: string;
  price: number;
  stockQuantity: number;
  category: string;
  ratings: number;
  reviews: number;
}

export interface ProductResponse {
  product: Product;
}

export interface ProductsResponse {
  allProducts: Product[];
}
