export interface Product {
  _id?: string;
  imgUrl: string;
  name: string;
  price: number;
  stockQuantity: number;
  category: string;
  brand?: string;
  ratings: number;
  reviews: number;
}
export interface ValidationErrorDetail {
  message: string;
  path: string[];
  type: string;
  context: {
    limit?: number;
    value?: any;
    label?: string;
    key?: string;
  };
}

export interface ValidationError {
  _original: any;
  details: ValidationErrorDetail[];
}

export interface ProductResponse {
  product?: Product;
  message: string;
  valid?: boolean;
  error?: ValidationError; // Add this line to include the error structure
}

export interface ProductsResponse {
  allProducts: Product[];
}

export interface UpdateProductResponse {
  updatedProduct: Product;
  status: boolean;
}
