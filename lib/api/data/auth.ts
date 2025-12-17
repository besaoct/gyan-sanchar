// lib/api/data/auth.ts
import axios from "axios";
import { BASE_URL, API_ENDPOINTS } from "../config/urls";

// Type Definitions for Auth
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T ;
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponseData {
  user: User;
  token: string;
  token_type: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

// API Service
const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
     Accept: "application/json",
  },
  
});

export const login = async (
  credentials: LoginRequest
): Promise<ApiResponse<AuthResponseData>> => {
  try {
    const response = await authApi.post<ApiResponse<AuthResponseData>>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response.data);
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};

export const register = async (
  userData: RegisterRequest
): Promise<ApiResponse<AuthResponseData>> => {
  try {
    const response = await authApi.post<ApiResponse<AuthResponseData>>(
      API_ENDPOINTS.AUTH.REGISTER,
      userData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};
