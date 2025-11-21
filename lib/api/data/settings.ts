// lib/api/data/settings.ts
import axios from "axios";
import { BASE_URL, API_ENDPOINTS } from "../config/urls";
import { ApiResponse, ApiErrorResponse } from "./auth";

// Type Definitions for Settings
export interface Settings {
  id: number;
  site_name: string;
  site_logo: string;
  site_favicon: string;
  meta_title: string;
  meta_description: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  created_at: string;
  updated_at: string;
}

// API Service
const settingsApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getSettings = async (): Promise<ApiResponse<Settings>> => {
  try {
    const response = await settingsApi.get<ApiResponse<Settings>>(
      API_ENDPOINTS.SETTINGS
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};
