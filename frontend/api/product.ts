import axios, { AxiosResponse } from "axios";
import { Product, ProductResponse, ProductsResponse, UpdateProductResponse } from "@/types/Product";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4500/api";

// Standard user functions
export const getAllProducts = async (): Promise<AxiosResponse<ProductsResponse>> => {
  return axios.get<ProductsResponse>(`${BASE_URL}/product/products`);
};

export const getProductById = async (id: string): Promise<AxiosResponse<ProductResponse>> => {
  return axios.get<ProductResponse>(`${BASE_URL}/product/product/${id}`);
};

// Admin functions
export const createProduct = async (productData: Product, authToken: string): Promise<AxiosResponse<ProductResponse>> => {
  return axios.post<ProductResponse>(`${BASE_URL}/admin/product/create-product`, productData, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

export const updateProduct = async (id: string, productData: Product, authToken: string): Promise<AxiosResponse<UpdateProductResponse>> => {
  return axios.put<UpdateProductResponse>(`${BASE_URL}/admin/product/update-product/${id}`, productData, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

export const deleteProduct = async (id: string, authToken: string): Promise<AxiosResponse> => {
  return axios.delete(`${BASE_URL}/admin/product/delete-product/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

export const deleteProducts = async (authToken: string): Promise<AxiosResponse> => {
  return axios.delete(`${BASE_URL}/admin/product/delete-products`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};
