// lib/api/data/courses.ts
import axios from "axios";
import { BASE_URL, API_ENDPOINTS } from "../config/urls";
import { ApiResponse, ApiErrorResponse } from "./auth";

// Type Definitions for Courses


// Detailed course (from /course/{slug} endpoint)
export interface CourseDetails {
  id: string | number;
  slug: string;
  course_name: string;
  course_type: string;
  short_description: string;
  hero_image: string;
  fees: {
    min: number;
    max: number;
  }
  basic_info: {
    duration: number;
    mode: string[];
    level: string;
    stream: {
      id: string | number;
      title: string;
      description?: string;
    };
    degree: {
      id: string | number;
      stream: string;
      title: string;
      description?: string;
    }
    accreditation: string[];
  };

  avg_fees: string;
  avg_salary: string;

  description: string;

  program_highlights: {
    title: string;
    description: string;
  }[];

  colleges: {
    id?: string | number;
    slug?: string;
    name: string;
    fees: string;
    seats: number;
    eligibility_exams: string;
  }[];

  syllabus: {
    semesterWiseSubjects: {
      title: string;
      description: string;
      subjects: {
        name: string;
        description: string;
        outcome: string;
      }[];
    }[];
  };

  eligibility: {
    criteria: string[];
    entranceExamsAccepted: string[];
    ageLimit: string;
  };

  careerProspects: {
    jobRoles: string[];
    recruiters: string[];
    averageSalaryRange: string;
  };

  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface CourseFilterOptions {
  levels: string[];
  modes: string[];
  duration: { min: number; max: number };
  feeRange: { min: number; max: number };
}


// API Service
const coursesApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getCourses = async (): Promise<ApiResponse<CourseDetails[]>> => {
  try {
    const response = await coursesApi.get<ApiResponse<CourseDetails[]>>(
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
    const response = await coursesApi.get<CourseDetails>(
      API_ENDPOINTS.COURSE_BY_SLUG(slug)
    );
    return {
      success: true,
      message: "Course fetched successfully",
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};

export const getCoursesFilters = async (): Promise<ApiResponse<CourseFilterOptions>> => {
  try {
    const response = await getCourses();

    if (!response.success) {
      return { success: false, message: response.message, data: {
        levels: [],
        modes: [],
        duration: { min: 0, max: 0 },
        feeRange: { min: 0, max: 0}
      } };
    }

    const courses = response.data;

    const levels = new Set<string>();
    const modes = new Set<string>();
    let minDuration = 0;
    let maxDuration = 0;
    let minFees = 0;
    let maxFees = 0;

    courses?.forEach((course) => {
      levels.add(course.basic_info.level);
      course.basic_info.mode.forEach((m) => modes.add(m));

      if (course.basic_info.duration < minDuration) minDuration = course.basic_info.duration;
      if (course.basic_info.duration > maxDuration) maxDuration = course.basic_info.duration;

      if (course.fees.min < minFees) minFees = course.fees.min;
      if (course.fees.max > maxFees) maxFees = course.fees.max;
    });

    return {
      success: true,
      message: "Course filters fetched successfully",
      data: {
        levels: Array.from(levels),
        modes: Array.from(modes),
        duration: { min: minDuration, max: maxDuration },
        feeRange: { min: minFees, max: maxFees },
      },
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};