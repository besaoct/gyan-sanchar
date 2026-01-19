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
  min: number | string;
  max: number | string;
}

export interface AdditionalFees {
  hostel: string | null;
  mess: string | null;
}

export interface NirfRanking {
  rank: number | string | null;
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

export interface CollegeCourse {
  id: string | number;
  slug?: string;
  name: string;
  level?: string;
  duration: number;
  fees: string;
  eligibility_exams: string | string[] | (string | object)[];
  seats: number;
  highlights: CourseHighlight[] | string; // sometimes JSON string, sometimes array
  stream ?:{
  id ?: string | number;
  title ?: string;
  };
  degree ?: {
    stream ?: string;
    id ?: string | number;
    title ?: string;
  }

   fee_info: {
    fee_heading: string | null
    fee_text: string | null
  }[];

   special_courses: string[] | null

}

export interface Hostel {
  boys: boolean;
  girls: boolean;
}

export interface Stream {
  id: string | number;
  title: string;
  description?: string;
}

export interface Degree {
  id: string | number;
  stream: string;
  title: string;
  description?: string;
}

export interface AdmissionProcess {
  exams?: string[] | null;
  criteria?: string;
  application_process?: string | null;
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
  id?: string | number;
  brochure_link?: string | null;
  brochure_document? : string |null;
  virtual_video?: string | null;
  virtual_video_link?: string | null;

  slug: string;
  name: string;
  verifyCollege?: boolean;
  location: Location;
  type: "Private" | "Deemed" | "Government" | string;
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
  streams: Stream[];
  courses: CollegeCourse[];
  facilities: string[];
  hostel: Hostel;
  hostelDetails: string | null;
  campusSize: number;
  campusHighlights: string | null;
  visionMission: string | null;
  notableAlumni: any[];
  scholarships: any[];
  studyMode: string[];
  admissionProcess: AdmissionProcess;
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

export interface CollegeFilterOptions {
  states: string[];
  streams: string[];
  levels: string[];
  instituteTypes: string[];
  feeRange: [number, number];
  rating: number;
  hostel: string[];
  facilities: string[];
  studyMode: string[];
  exams: string[];
  courses: string[];
  degrees: Degree[];
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
    const response = await collegeApi.post<
      ApiResponse<PostCollegeReviewResponseData>
    >(API_ENDPOINTS.COLLEGE_REVIEWS, reviewData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};

export const getCollegeFilters = async (): Promise<
  ApiResponse<CollegeFilterOptions>
> => {
  try {
    const response = await getColleges();
    const degreesResponse = await getDegrees();
    const streamResponse = await getStreams();

    if (!response.success || !response.data) {
      return {
        success: false,
        message: response.message || "Failed to fetch colleges for filters",
        data: {
          levels: [],
          states: [],
          streams: [],
          instituteTypes: [],
          facilities: [],
          exams: [],
          feeRange: [0, 0],
          rating: 0,
          hostel: [],
          studyMode: [],
          courses: [],
          degrees: [],
        },
      };
    }

    const colleges: College[] = response.data;
    const degrees: Degree[] = degreesResponse.success ? degreesResponse.data : [];

    // Use Sets to avoid duplicates
    const states = new Set<string>();
    const streams = new Set<string>();
    const levels = new Set<string>();
    const instituteTypes = new Set<string>();
    const facilities = new Set<string>();
    const exams = new Set<string>();
    const hostelOptions = new Set<string>();
    const studyModes = new Set<string>();
    const coursesSet = new Set<string>();

    let minFee = 0;
    let maxFee = 0;
    let highestRating = 5.0;

    const streamDescriptions = new Map<string, string>();

    colleges.forEach((college) => {
      // Location & State
      if (college.location?.state) {
        states.add(college.location.state);
      }

      // Streams
      const collegeStreams : Stream []= streamResponse.success  ? streamResponse.data : [];

      collegeStreams?.forEach((stream) => {
        if (typeof stream === "string") {
          streams.add(stream);
          // No description if it's just string
        } else if (stream && typeof stream === "object" && stream.title) {
          streams.add(stream.title);
          if (stream.description) {
            streamDescriptions.set(stream.title, stream.description);
          }
        }
      });

      // college levels
      college.courses?.forEach((course) => {
        if (course.level && typeof course.level === "string") {
          levels.add(course.level);
        }
      });

      // courses
      college.courses?.forEach((course) => {
        if (course.name && typeof course.name === "string") {
          coursesSet.add(course.name.trim());
        }
      });

      // Institute Type
      if (college.type) {
        instituteTypes.add(college.type);
      }

      // Facilities
      college.facilities?.forEach((facility) => facilities.add(facility));

      // Exams (from courses)
      college.courses?.forEach((course) => {
        if (Array.isArray(course.eligibility_exams)) {
          course.eligibility_exams.forEach((exam: any) => {
            if (typeof exam === "string") {
              exams.add(exam);
            } else if (exam && typeof exam === "object" && "name" in exam) {
              exams.add((exam as any).name);
            }
          });
        } else if (
          typeof course.eligibility_exams === "string" &&
          course.eligibility_exams.trim()
        ) {
          exams.add(course.eligibility_exams);
        }
      });

      // Hostel
      if (college.hostel) {
        if (college.hostel.boys) hostelOptions.add("Boys");
        if (college.hostel.girls) hostelOptions.add("Girls");
      }

      // Study Mode
      college.studyMode?.forEach((mode) => studyModes.add(mode));

      // Fee Range (from courses or college.fees)
      college.courses?.forEach((course) => {
        if (
          course.fees &&
          !isNaN(parseInt(course.fees.replace(/[^0-9]/g, ""), 10))
        ) {
          const fee = parseInt(course.fees.replace(/[^0-9]/g, ""), 10);
          if (fee < minFee) minFee = fee;
          if (fee > maxFee) maxFee = fee;
        }
      });

      // Fallback to college-level fees if available
      if (college.fees?.min !== undefined && Number(college.fees.min) < minFee)
        minFee = Number(college.fees.min);
      if (college.fees?.max !== undefined && Number(college.fees.max) > maxFee)
        maxFee = Number(college.fees.max);

      // Rating
      if (college.rating > highestRating) highestRating = college.rating;
    });

    // Final fee range fallback
    if (minFee === Infinity) minFee = 0;
    if (maxFee === 0) maxFee = 10000000;

    const filterOptions: CollegeFilterOptions = {
      states: Array.from(states).sort(),
      levels: Array.from(levels).sort(),
      streams: Array.from(streams),
      instituteTypes: Array.from(instituteTypes).sort(),
      facilities: Array.from(facilities).sort(),
      exams: Array.from(exams).sort(),
      feeRange: [minFee, maxFee],
      rating: Math.floor(highestRating), // or keep as float if UI supports
      hostel: Array.from(hostelOptions),
      studyMode: Array.from(studyModes).sort(),
      courses: Array.from(coursesSet).sort(),
      degrees: degrees,
    };

    return {
      success: true,
      message: "Filters loaded successfully",
      data: filterOptions,
    };
  } catch (error) {
    console.error("Error fetching college filters:", error);
    return {
      success: false,
      message: axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to load filters"
        : "An unexpected error occurred",
      data: {
        states: [],
        levels: [],
        streams: [],
        instituteTypes: [],
        facilities: [],
        exams: [],
        feeRange: [0, 0],
        rating: 0,
        hostel: [],
        studyMode: [],
        courses: [],
        degrees: [],
      },
    };
  }
};

// streams api function
export const getStreams = async (): Promise<ApiResponse<Stream[]>> => {
  try {
    const response = await collegeApi.get<ApiResponse<Stream[]>>(
      API_ENDPOINTS.STREAMS
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};

// degrees api function
export const getDegrees = async (): Promise<ApiResponse<Degree[]>> => {
  try {
    const response = await collegeApi.get<ApiResponse<Degree[]>>(
      API_ENDPOINTS.DEGREES
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
}


// top colleges api function
export const getTopColleges = async (): Promise<ApiResponse<College[]>> => {
  try {
    const response = await collegeApi.get<ApiResponse<College[]>>(
      `${API_ENDPOINTS.COLLEGES_TOP}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};

// popular colleges api function
export const getPopularColleges = async (): Promise<ApiResponse<College[]>> => {
  try {
    const response = await collegeApi.get<ApiResponse<College[]>>(
      `${API_ENDPOINTS.COLLEGES_POPULAR}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};

// featured colleges api function
export const getFeaturedColleges = async (): Promise<ApiResponse<College[]>> => {
  try {
    const response = await collegeApi.get<ApiResponse<College[]>>(
      `${API_ENDPOINTS.COLLEGES_FEATURED}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};