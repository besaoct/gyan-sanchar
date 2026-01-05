// lib/api/data/home.ts
import axios from "axios";
import { BASE_URL, API_ENDPOINTS } from "../config/urls";

export interface ApiResponse<T> {
    status: boolean;
    message: string;
    data: T ;
}

export interface ApiErrorResponse {
    status: boolean;
    message: string;
    errors?: Record<string, string[]>;
}

// Type Definitions for Home Data

export interface Testimonial {
    id: number;
    student_name: string;
    designation: string;
    college_id: number;
    quote: string;
    created_at: string;
}

export interface ApplicationSection {
    id: number;
    heading: string;
    subheading: string;
    description: string;
}

export interface FooterMedia {
    id: number;
    title: string;
    url: string;
    logo_image: string;
}

export interface MediaItem {
    id: number;
    title: string;
    image: string;
}

export interface IndicatorItem {
    title: string;
    link: string;
}

export interface Indicator {
    id: number;
    rating: string;
    items: IndicatorItem[];
}

export interface OfferFeature {
    title: string;
    subtitle: string;
}

export interface Offer {
    id: number;
    title: string;
    link: string;
    features: OfferFeature[];
    button_text: string;
    button_link: string;
}

export interface HomeData {
    testimonials: Testimonial[];
    application_sections: ApplicationSection[];
    footer_media: FooterMedia[];
    media: MediaItem[];
    indicators: Indicator[];
    offers: Offer[];
}

const homeApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export const getHomeData = async (): Promise<ApiResponse<HomeData>> => {
    try {
        const response = await homeApi.get<ApiResponse<HomeData>>(API_ENDPOINTS.HOME);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data as ApiErrorResponse;
        }
        throw error;
    }
};
