'use client';

import { useState, useEffect } from 'react';

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

  const apiKey = process.env.GOOGLE_PLACES_API_KEY as String || 'AIzaSyD1ydIgyJyqnEgdEfKYKoUkCcQvtkcD2Yo';


  const fetchReviews = async () => {
    if (!query.trim()) {
      setError('Search query is required');
      setLoading(false);
      return;
    }

    if (!apiKey) {
      setError('Google Places API key is required');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Step 1: Text Search
      const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
        query
      )}&key=${apiKey}`;

      const searchRes = await fetch(searchUrl);
      const searchData = await searchRes.json();

      if (searchData.status !== 'OK' || !searchData.results?.length) {
        throw new Error(searchData.status || 'Place not found');
      }

      const place = searchData.results[0];
      const placeId = place.place_id;

      console.log('Place found:', place.name, placeId);


      const result: GooglePlaceData = {
        name: place.name,
        place_id: placeId,
        rating:  place.rating ?? 0,
        user_ratings_total:  place.user_ratings_total ?? 0,
        formatted_address: place.formatted_address,
        reviews:place.reviews || [],
      };

      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load reviews');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (enabled) {
      fetchReviews();
    }
  }, [query, apiKey, enabled]);

  return {
    data,
    loading,
    error,
    refetch: fetchReviews,
  };
};