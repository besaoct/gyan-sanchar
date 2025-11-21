// lib/api/data/live-consultation.ts
import axios from "axios";
import { BASE_URL, API_ENDPOINTS } from "../config/urls";
import { ApiResponse, ApiErrorResponse } from "./auth";

// Type Definitions for Live Consultation
export interface LiveConsultationRequest {
  name: string;
  email: string;
  country_code: string;
  mobile: string;
  preferred_date: string;
  preferred_time: string;
  message: string;
}

// API Service
const liveConsultationApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const submitLiveConsultation = async (
  consultationData: LiveConsultationRequest,
  token: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await liveConsultationApi.post<ApiResponse<any>>(
      API_ENDPOINTS.LIVE_CONSULTATION,
      consultationData,
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
