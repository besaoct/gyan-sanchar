// lib/api/data/colleges.ts
import axios from "axios";
import { BASE_URL, API_ENDPOINTS } from "../config/urls";
import { ApiResponse, ApiErrorResponse } from "./auth"; // Re-using common types

// Type Definitions for Colleges

export interface Location {
  city: string;
  state: string;
}

export interface Fees {
  min: number;
  max: number;
}

export interface Ranking {
  nirf: number;
  category: string | null;
}

export interface Course {
  id: string;
  name: string | null;
  duration: number;
  fees: number;
  eligibility: string | null;
  seats: number;
  highlights: string | null;
}

export interface NotableAlumni {
  name: string;
  achievement: string;
}

export interface AdditionalFees {
  hostel: number;
  mess: number;
}

export interface Scholarship {
  name: string;
  description: string;
}

export interface ImportantDate {
  event: string;
  date: string;
}

export interface AdmissionProcess {
  exams: string[];
  criteria: string;
  applicationFee: number;
  importantDates: ImportantDate[];
}

export interface Placement {
  averagePackage: number;
  highestPackage: number;
  placementRate: number;
  topRecruiters: string[];
  highlights: string[];
  placementProcess: string;
}

export interface CampusLife {
  studentStrength: number;
  facultyRatio: string;
  clubs: string[];
}

export interface CollegeReviewData {
  id: string;
  studentName: string;
  rating: number;
  comment: string;
  course: string;
  year: number;
  date: string;
}

export interface College {
  id: string;
  name: string;
  location: Location;
  type: string;
  rating: number;
  reviews: number;
  fees: Fees;
  ranking: Ranking;
  image: string;
  short_description: string;
  description: string;
  established: number;
  accreditation: string[] | string;
  streams: string[] | string;
  courses: Course[];
  facilities: string[] | null;
  hostel: {
    boys: boolean;
    girls: boolean;
  };
  hostelDetails: string | null;
  campusSize: number;
  campusHighlights: string;
  visionMission: string | null;
  notableAlumni: NotableAlumni[] | null;
  additionalFees: AdditionalFees | null;
  scholarships: Scholarship[] | null;
  studyMode: string[] | null;
  admissionProcess: AdmissionProcess | null;
  placement: Placement | null;
  campusLife: CampusLife | null;
  gallery: string[] | null;
  reviews_data: CollegeReviewData[];
}

export interface SingleCollege {
  id: number;
  name: string;
  campus_image: string;
  nirf_rank: number;
  nirf_category: string;
  type: string;
  rating: string;
  review_count: number;
  city: string;
  state: string;
  fees_min: string;
  fees_max: string;
  avg_fees: string;
  description: string;
  short_description: string;
  established_year: number;
  accreditation: string[];
  streams: string[];
  facilities: string[];
  hostel_boys: number;
  hostel_girls: number;
  hostel_details: string;
  campus_size: string;
  campus_highlights: string;
  vision_mission: string;
  notable_alumni: NotableAlumni[];
  additional_fees: AdditionalFees;
  scholarships: Scholarship[];
  study_mode: string[];
  admission_process: AdmissionProcess;
  placement: Placement;
  campus_life: CampusLife;
  gallery: string[];
  created_at: string;
  updated_at: string;
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
  id: number;
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
): Promise<ApiResponse<SingleCollege>> => {
  try {
    const response = await collegeApi.get<ApiResponse<SingleCollege>>(
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
