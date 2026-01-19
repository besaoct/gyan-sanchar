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


export interface HomeHeroSection {
    id: number;
    heading: string;
    sub_heading: string;
    title: string;
    url: string;
    youtube_video_link: string;
}


export interface MediaTitle {
    id: number;
    title: string;
}

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

export interface FormSection{
    id:number,
    heading:string
    sub_heading:string,
    description: string
}

export interface Recommendations{
              id: number
                title: string
                description:string
                button_text: string
                button_link: string
}
export interface HomeCard {
    title: string,
    description: string,
    icon_image:string
} 
export interface Offer {
    id: number;
    title: string;
    link: string;
    is_active: boolean;
    features: OfferFeature[];
    button_text: string;
    button_link: string;
    cover_image: string;
}

export interface HomeData {
    hero_section: HomeHeroSection;
    testimonials: Testimonial[];
    application_sections: ApplicationSection[];
    footer_media: FooterMedia[];
    media: MediaItem[];
    media_title: MediaTitle[];
    indicators: Indicator[];
    offers: Offer[];
    recommendations: Recommendations[],
    courier_cards: HomeCard[],
    form_sections: FormSection[]
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
