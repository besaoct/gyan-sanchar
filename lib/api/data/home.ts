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

    // "hero_section": {
    //         "id": 1,
    //         "heading": "Right Guidance, Bright Future",
    //         "sub_heading": "Get expert advice and personalized guidance to find the right college, building a better future for your career at a time.",
    //         "title": "Watch our Brand Film here",
    //         "url": "https://gyan-sanchar.vercel.app/",
    //         "youtube_video_link": "https://www.youtube.com/"
    //     },
//    "mediatitle": [
//             {
//                 "id": 1,
//                 "title": "Praised by the media"
//             }
//         ],

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
