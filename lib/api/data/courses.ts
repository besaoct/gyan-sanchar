// lib/api/data/courses.ts
import axios from "axios";
import { BASE_URL, API_ENDPOINTS } from "../config/urls";
import { ApiResponse, ApiErrorResponse } from "./auth";
import { College } from "./colleges";

// Type Definitions for Courses
export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration: number;
  fees: {
    min: number;
    max: number;
  };
  mode: string[];
  level: string;
  image: string | null;
}

export interface CourseDetails {
  slug: string;
  basicInfo: {
    courseName: string;
    courseType: string;
    duration: number;
    mode: string[];
    averageFees: string;
    level: string;
    heroImage: string | null;
  };
  overview: {
    introduction: string;
    highlights: string[];
  };
  colleges_offering: {
    totalColleges: number;
    colleges: College[];
  };
  careerProspects: {
    jobRoles: string[];
    recruiters: string[];
    averageSalaryRange: string;
  };
  faqs: any[];
}

// API Service
const coursesApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getCourses = async (): Promise<ApiResponse<Course[]>> => {
  try {
    const response = await coursesApi.get<ApiResponse<Course[]>>(
      API_ENDPOINTS.COURSES
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};

export const getCourseBySlug = async (
  slug: string
): Promise<ApiResponse<CourseDetails>> => {
  try {
    const response = await coursesApi.get<ApiResponse<CourseDetails>>(
      API_ENDPOINTS.COURSE_BY_SLUG(slug)
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};
