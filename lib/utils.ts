import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// googlePlaces.ts
export interface GoogleReview {
  author_name: string;
  author_url?: string;
  language?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description?: string;
  text?: string;
  time: number; // Unix timestamp in seconds
}

export interface GooglePlaceResult {
  name: string;
  place_id: string;
  rating: number;
  user_ratings_total: number;
  formatted_address?: string;
  reviews?: GoogleReview[];
}

export interface GooglePlacesError {
  message: string;
  status?: string;
}

/**
 * Fetches Google Place rating and up to 5 reviews by search query
 * @param query - Search term, e.g., "Vels Institute of Science Technology Advanced Studies Pallavaram Chennai"
 * @param apiKey - Your Google Places API key
 * @returns Promise with place data or error
 */
export const fetchGooglePlaceReviews = async (
  query: string,
): Promise<{ data: GooglePlaceResult | null; error: GooglePlacesError | null }> => {

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey || apiKey.length === 0) {
    return { data: null, error: { message: 'Google Places API key is not set in environment variables' } };
  }

  if (!query.trim()) {
    return { data: null, error: { message: 'Query is required' } };
  }



  if (!apiKey) {
    return { data: null, error: { message: 'API key is required' } };
  }

  try {
    // Step 1: Text Search to find place_id and basic info
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      query
    )}&key=${apiKey}`;

    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (searchData.status !== 'OK' || !searchData.results?.length) {
      return {
        data: null,
        error: {
          message: searchData.status || 'Place not found',
          status: searchData.status,
        },
      };
    }

    const place = searchData.results[0];
    const placeId = place.place_id;

    // Step 2: Fetch reviews using Place Details
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews,formatted_address&key=${apiKey}`;

    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    if (detailsData.status !== 'OK') {
      return {
        data: null,
        error: { message: detailsData.status || 'Failed to fetch reviews' },
      };
    }

    const result: GooglePlaceResult = {
      name: detailsData.result.name || place.name,
      place_id: placeId,
      rating: detailsData.result.rating ?? place.rating ?? 0,
      user_ratings_total: detailsData.result.user_ratings_total ?? place.user_ratings_total ?? 0,
      formatted_address: detailsData.result.formatted_address,
      reviews: detailsData.result.reviews || [],
    };

    return { data: result, error: null };
  } catch (err) {
    return {
      data: null,
      error: { message: err instanceof Error ? err.message : 'Network error' },
    };
  }
};