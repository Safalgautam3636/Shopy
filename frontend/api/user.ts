import axios, { AxiosResponse } from "axios";
import { LoginCredentials, User, UserResponse, UsersResponse } from "@/types/User";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4500/api";

// User authentication functions
export const signupUser = async (userData: User): Promise<AxiosResponse<UserResponse>> => {
  return axios.post<UserResponse>(`${BASE_URL}/user/signup`, userData);
};

export const loginUser = async (credentials: LoginCredentials): Promise<AxiosResponse<UserResponse>> => {
  return axios.post<UserResponse>(`${BASE_URL}/user/login`, credentials);
};

export const logoutUser = async (): Promise<AxiosResponse> => {
  return axios.get(`${BASE_URL}/user/logout`);
};

// User profile functions
export const getOwnUserProfile = async (authToken: string): Promise<AxiosResponse<UserResponse>> => {
  return axios.get<UserResponse>(`${BASE_URL}/user/me`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

export const updateOwnUserProfile = async (userData: User, authToken: string): Promise<AxiosResponse<UserResponse>> => {
  return axios.put<UserResponse>(`${BASE_URL}/user/update`, userData, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

// Admin functions for user management
export const getAllUsers = async (authToken: string, adminAuthToken: string): Promise<AxiosResponse<UsersResponse>> => {
  return axios.get<UsersResponse>(`${BASE_URL}/admin/users`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      AdminAuthorization: `Bearer ${adminAuthToken}`,
    },
  });
};

export const getUserById = async (id: string, authToken: string, adminAuthToken: string): Promise<AxiosResponse<UserResponse>> => {
  return axios.get<UserResponse>(`${BASE_URL}/admin/user/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      AdminAuthorization: `Bearer ${adminAuthToken}`,
    },
  });
};

export const deleteUser = async (id: string, authToken: string, adminAuthToken: string): Promise<AxiosResponse> => {
  return axios.delete(`${BASE_URL}/admin/user/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      AdminAuthorization: `Bearer ${adminAuthToken}`,
    },
  });
};

export const deleteAllUsers = async (authToken: string, adminAuthToken: string): Promise<AxiosResponse> => {
  return axios.delete(`${BASE_URL}/admin/user/delete-all`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      AdminAuthorization: `Bearer ${adminAuthToken}`,
    },
  });
};

export const updateUserById = async (
  id: string,
  userData: User,
  authToken: string,
  adminAuthToken: string,
): Promise<AxiosResponse<UserResponse>> => {
  return axios.put<UserResponse>(`${BASE_URL}/admin/user/update/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      AdminAuthorization: `Bearer ${adminAuthToken}`,
    },
  });
};
