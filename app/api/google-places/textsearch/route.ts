// app/api/google-places/textsearch/route.ts
import { GooglePlaceData } from '@/hooks/use-google-place-reviews';
import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  if (!API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${API_KEY}`;

  try {
    const res = await fetch(url, {
      headers: { 'Accept': 'application/json' },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ error: errorData }, { status: res.status });
    }

    const data = await res.json();

    // Extract what you need (first result)
    if (data.status !== 'OK' || !data.results?.length) {
      return NextResponse.json({ error: data.status || 'Place not found' }, { status: 404 });
    }

    const place = data.results[0];
     const placeId = place.place_id;
    // Step 2: Place Details for reviews
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews,formatted_address&key=${API_KEY}`;

      const detailsRes = await fetch(detailsUrl);
      const detailsData = await detailsRes.json();

      if (detailsData.status !== 'OK') {
        throw new Error(detailsData.status || 'Failed to fetch details');
      }

      const result: GooglePlaceData = {
        name: detailsData.result.name || place.name,
        place_id: placeId,
        rating: detailsData.result.rating ?? place.rating ?? 0,
        user_ratings_total: detailsData.result.user_ratings_total ?? place.user_ratings_total ?? 0,
        formatted_address: detailsData.result.formatted_address,
        reviews: detailsData.result.reviews || [],
      };


    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch from Google' }, { status: 500 });
  }
}