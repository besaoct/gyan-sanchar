export const BASE_URL = "https://gitcsdemoserver.online/gyansanchar/public";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
  },
  COLLEGES: "/api/v1/colleges",
  COLLEGE_BY_ID: (id: string | number) => `/api/v1/college/${id}`,
  COLLEGE_REVIEWS: "/api/v1/college-reviews",
  COLLEGE_REVIEWS_BY_ID: (id: string | number) => `/api/v1/college-reviews/${id}`,
};