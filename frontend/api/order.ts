import axios, { AxiosResponse } from "axios";
import { Order, OrderResponse, OrdersResponse } from "@/types/Order";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4500/api";

// Standard user functions
export const createOrder = async (orderData: Order, authToken: string): Promise<AxiosResponse<OrderResponse>> => {
  return axios.post<OrderResponse>(`${BASE_URL}/order/create-order`, orderData, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

export const getOrderById = async (id: string, authToken: string): Promise<AxiosResponse<OrderResponse>> => {
  return axios.get<OrderResponse>(`${BASE_URL}/order/get-order/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

export const getUserOrders = async (authToken: string): Promise<AxiosResponse<OrdersResponse>> => {
  return axios.get<OrdersResponse>(`${BASE_URL}/order/get-orders`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

export const cancelOrder = async (id: string, authToken: string): Promise<AxiosResponse<OrderResponse>> => {
  return axios.put<OrderResponse>(
    `${BASE_URL}/order/cancel-order/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
};

export const updateOrderStatus = async (id: string, orderData: Order, authToken: string): Promise<AxiosResponse<OrderResponse>> => {
  return axios.put<OrderResponse>(`${BASE_URL}/order/update-order/${id}`, orderData, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

// Admin functions
export const getAllOrders = async (authToken: string): Promise<AxiosResponse<OrdersResponse>> => {
  return axios.get<OrdersResponse>(`${BASE_URL}/admin/order/orders`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

export const cancelAllOrders = async (authToken: string): Promise<AxiosResponse> => {
  return axios.put(
    `${BASE_URL}/admin/order/cancel-orders`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
};

export const cancelSpecificOrder = async (id: string, authToken: string): Promise<AxiosResponse<OrderResponse>> => {
  return axios.put<OrderResponse>(
    `${BASE_URL}/admin/order/cancel-order/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
};

export const updateOrderAdmin = async (id: string, orderData: Order, authToken: string): Promise<AxiosResponse<OrderResponse>> => {
  return axios.put<OrderResponse>(`${BASE_URL}/admin/order/update-order/${id}`, orderData, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};
