"use client";

import { useState, useEffect } from "react";

export interface GoogleReview {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  text?: string;
  time: number; // Unix timestamp in seconds
  relative_time_description?: string;
}

export interface GooglePlaceData {
  name: string;
  place_id: string;
  rating: number;
  user_ratings_total: number;
  formatted_address?: string;
  reviews: GoogleReview[];
}

interface UseGooglePlaceReviewsReturn {
  data: GooglePlaceData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface UseGooglePlaceReviewsOptions {
  enabled?: boolean; // Allow disabling auto-fetch
}

/**
 * Custom hook to fetch Google Place rating and up to 5 reviews by search query
 *
 * @param query - e.g., "Vels Institute of Science Technology Advanced Studies Pallavaram Chennai"
 * @param apiKey - Your Google Places API key
 * @param options - Optional config
 */
export const useGooglePlaceReviews = (
  query: string,
  options: UseGooglePlaceReviewsOptions = {}
): UseGooglePlaceReviewsReturn => {
  const { enabled = true } = options;

  const [data, setData] = useState<GooglePlaceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    if (!query.trim()) {
      setError("Search query is required");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/google-places/textsearch?query=${encodeURIComponent(query)}`
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed");
      }
      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load reviews");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (enabled) {
      fetchReviews();
    }
  }, [query, enabled]);

  return {
    data,
    loading,
    error,
    refetch: fetchReviews,
  };
};
