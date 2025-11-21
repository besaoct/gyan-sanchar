// lib/api/data/applications.ts
import axios from "axios";
import { BASE_URL, API_ENDPOINTS } from "../config/urls";
import { ApiResponse, ApiErrorResponse } from "./auth";

// Type Definitions for Applications
export interface ApplicationRequest {
  full_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  address: string;
}

// API Service
const applicationsApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const submitApplication = async (
  applicationData: ApplicationRequest,
  token: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await applicationsApi.post<ApiResponse<any>>(
      API_ENDPOINTS.APPLICATIONS,
      applicationData,
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
