// lib/api/data/enquiries.ts
import axios from "axios";
import { BASE_URL, API_ENDPOINTS } from "../config/urls";
import { ApiResponse, ApiErrorResponse } from "./auth";

// Type Definitions for Enquiries
export interface EnquiryRequest {
  type: string;
  name: string;
  mobile: string;
  email: string;
  interested_online_degree: boolean;
  enable_whatsapp_updates: boolean;
}

// API Service
const enquiriesApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const submitEnquiry = async (
  enquiryData: EnquiryRequest,
  token: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await enquiriesApi.post<ApiResponse<any>>(
      API_ENDPOINTS.ENQUIRIES,
      enquiryData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};
