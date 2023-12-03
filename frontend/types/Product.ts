export interface Product {
  _id?: string;
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