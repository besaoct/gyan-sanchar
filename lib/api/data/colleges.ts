// lib/api/data/colleges.ts
import axios from "axios";
import { BASE_URL, API_ENDPOINTS } from "../config/urls";
import { ApiResponse, ApiErrorResponse } from "./auth"; // Re-using common types

// Type Definitions for Colleges


export interface Location {
  city: string;
  state: string;
}

export interface FeesRange {
  min: number;
  max: number;
}

export interface AdditionalFees {
  hostel: string | null;
  mess: string | null;
}

export interface NirfRanking {
  rank: number;
  category: string | null;
}

export interface Ranking {
  ranking_body: string;
  category: string;
  rank: string;
  ranking_year: string;
}

export interface CourseHighlight {
  title: string;
  description: string;
}

export interface Course {
  id: string | number;
  slug?: string;
  name: string;
  duration: number;
  fees: string;
  eligibility_exams: string | string[] | (string | object)[];
  seats: number;
  highlights: CourseHighlight[] | string; // sometimes JSON string, sometimes array
}

export interface Hostel {
  boys: boolean;
  girls: boolean;
}

export interface AdmissionProcess {
  exams?: string[];
  criteria?: string;
  application_process?: string;
  applicationFee?: string | number;
  importantDates?: { event: string; date: string }[];
  [key: string]: any; // fallback for dynamic structures
}

export interface Placement {
  averagePackage: string | null;
  highestPackage: string | null;
  placementRate: string | null;
  topRecruiters?: string[];
  highlights?: string[];
  placementProcess: string | null;
}

export interface CampusLife {
  studentStrength: string | null;
  facultyRatio: string | null;
  clubs?: string[];
}

export interface Review {
  id: string;
  studentName: string;
  rating: number;
  comment: string;
  course: string;
  year: number;
  date: string;
}

export interface VideoReel {
  id: string;
  type: "youtube" | "local";
  youtubeId: string | null;
  src: string | null;
  title: string;
  thumbnail: string | null;
}

export interface College {
  id? : string | number;
  slug: string;
  name: string;
  location: Location;
  type: "Private" | "Government" | string;
  rating: number;
  reviews: number;
  fees: FeesRange;
  additionalFees: AdditionalFees;
  feesStructure: string | null;
  nirf_ranking: NirfRanking;
  rankings: Ranking[];
  image: string;
  short_description: string | null;
  description: string | null;
  established: number;
  accreditation: string[];
  streams: string[];
  courses: Course[];
  facilities: string[];
  hostel: Hostel;
  hostelDetails: string | null;
  campusSize: number;
  campusHighlights: string | null;
  visionMission: string | null;
  notableAlumni: any[]; // often malformed JSON strings or objects
  scholarships: any[];  // same issue — often malformed
  studyMode: string[];
  admissionProcess: AdmissionProcess | any[]; // mixed formats in data
  placement: Placement;
  campusLife: CampusLife;
  gallery: string[];
  reviews_data: Review[];
  videoReels: VideoReel[];
}


export interface CollegeReview {
  id: number;
  student_name: string;
  rating: string;
  comment: string;
  course: string;
  year: number;
  date: string;
}

export interface CollegeReviewsResponse {
    success: boolean;
    college_id: string;
    total_reviews: number;
    average_rating: number;
    data: CollegeReview[];
}

export interface PostCollegeReviewRequest {
  college_id: number;
  student_name: string;
  rating: number;
  comment: string;
  course: string;
  year: string;
  date: string;
}

export interface PostCollegeReviewResponseData {
  college_id: number;
  student_name: string;
  rating: number;
  comment: string;
  course: string;
  year: string;
  date: string;
}

// API Service
const collegeApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getColleges = async (): Promise<ApiResponse<College[]>> => {
  try {
    const response = await collegeApi.get<ApiResponse<College[]>>(
      API_ENDPOINTS.COLLEGES
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};

export const getCollegeById = async (
  id: string | number
): Promise<ApiResponse<College>> => {
  try {
    const response = await collegeApi.get<ApiResponse<College>>(
      API_ENDPOINTS.COLLEGE_BY_ID(id)
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};

export const getCollegeReviewsById = async (
  id: string | number
): Promise<CollegeReviewsResponse> => {
  try {
    const response = await collegeApi.get<CollegeReviewsResponse>(
      API_ENDPOINTS.COLLEGE_REVIEWS_BY_ID(id)
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};

export const postCollegeReview = async (
  reviewData: PostCollegeReviewRequest,
  token: string
): Promise<ApiResponse<PostCollegeReviewResponseData>> => {
  try {
    const response = await collegeApi.post<ApiResponse<PostCollegeReviewResponseData>>(
      API_ENDPOINTS.COLLEGE_REVIEWS,
      reviewData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
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
