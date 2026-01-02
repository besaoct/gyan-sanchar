export const BASE_URL = "https://gitcsdemoserver.online/gyansanchar/public";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
  },
  COLLEGES: "/api/v1/colleges",
  COLLEGES_TOP: "/api/v1/colleges/top",
  COLLEGES_POPULAR: "/api/v1/colleges/popular",
  COLLEGES_FEATURED: "/api/v1/colleges/featured",
  COLLEGE_BY_ID: (id: string | number) => `/api/v1/college/${id}`,
  COLLEGE_REVIEWS: "/api/v1/college-reviews",
  COLLEGE_REVIEWS_BY_ID: (id: string | number) => `/api/v1/college-reviews/${id}`,
  SETTINGS: "/api/v1/settings",
  ARTICLES: "/api/v1/articles",
  ARTICLE_BY_SLUG: (slug: string) => `/api/v1/article/${slug}`,
  COURSES: "/api/v1/courses",
  COURSE_BY_SLUG: (slug: string) => `/api/v1/course/${slug}`,
  ENQUIRIES: "/api/v1/enquiries",
  APPLICATIONS: "/api/v1/applications",
  LIVE_CONSULTATION: "/api/v1/live-consultation",
  STREAMS: "/api/v1/streams",
};