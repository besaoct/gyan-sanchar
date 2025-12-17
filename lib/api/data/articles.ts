// lib/api/data/articles.ts
import axios from "axios";
import { BASE_URL, API_ENDPOINTS } from "../config/urls";
import { ApiResponse, ApiErrorResponse } from "./auth";

// Type Definitions for Articles
export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string | null;
  category: string;
  tags: string[];
}

// API Service
const articlesApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
     Accept: "application/json",

  },
});

export const getArticles = async (): Promise<ApiResponse<Article[]>> => {
  try {
    const response = await articlesApi.get<ApiResponse<Article[]>>(
      API_ENDPOINTS.ARTICLES
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};

export const getArticleBySlug = async (
  slug: string
): Promise<ApiResponse<Article>> => {
  try {
    const response = await articlesApi.get<ApiResponse<Article>>(
      API_ENDPOINTS.ARTICLE_BY_SLUG(slug)
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};
